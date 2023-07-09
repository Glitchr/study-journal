from rest_framework import viewsets, permissions

from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """API endpoint para ver o editar las tareas de un usuario."""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
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