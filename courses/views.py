from rest_framework import viewsets, permissions

from .serializers import CourseSerializer
from .models import Course


class CourseViewSet(viewsets.ModelViewSet):
    """API endpoint que permite ver o editar los cursos del usuario"""
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
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
