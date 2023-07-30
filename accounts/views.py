from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .serializers import UserSerializer, GroupSerializer
from .permissions import IsStaffOrSelf


class UserViewSet(viewsets.ModelViewSet):
    """API endpoint que permite ver o editar a los usuarios."""
    queryset = User.objects.all().order_by('-date_joined').select_related('profile')
    serializer_class = UserSerializer
    permission_classes = [IsStaffOrSelf]

    def get_queryset(self):
        """
        Retorna el queryset filtrado por el usuario actual, a menos de 
        que sea admin.
        """
        if self.request.user.is_staff:
            return self.queryset
        else:
            return self.queryset.filter(id=self.request.user.id)

    def get_object(self):
        """
        Retorna el objeto para la accion actual, a menos de que 
        el usuario no sea admin y no sea el dueño.
        """
        obj = super().get_object()
        if self.request.user.is_staff or obj == self.request.user:
            return obj
        else:
            raise PermissionDenied("You do not have permission to access this object.")

    def perform_create(self, serializer):
        """Crea un nuevo usuario y lo agrega automáticamente al grupo 'user'."""
        super().perform_create(serializer)
        user = serializer.instance
        group = Group.objects.get(name='User')
        user.groups.add(group)

    def list(self, request, *args, **kwargs):
        """
        Maneja las solicitudes GET al endpoint api/users.

        Si el usuario que hace la solicitud está autenticado devuelve la 
        información del usuario. De lo contrario, devuelve un error de
        "Permiso denegado".
        """
        if request.user.is_authenticated:
            queryset = self.filter_queryset(self.get_queryset().filter(id=request.user.id))
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            raise PermissionDenied("You do not have permission to view the list of users.")


class GroupViewSet(viewsets.ModelViewSet):
    """API endpoint que permite ver o editar los grupos."""
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAdminUser]
