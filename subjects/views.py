from rest_framework import viewsets, permissions

from .serializers import SubjectSerializer
from .models import Subject


class SubjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite ver o editar los temas de un curso del usuario.
    """
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Retorna el queryset filtrado por el usuario actual, a menos de
        que el usuario sea admin.
        """
        user = self.request.user
        if user.is_staff:
            return self.queryset
        else:
            return self.queryset.filter(user=user)
