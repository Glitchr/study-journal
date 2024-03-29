from rest_framework import viewsets, permissions

from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """API endpoint para ver o editar las tareas de un usuario."""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Retorna el queryset filtrado por el usuario actual."""
        user = self.request.user

        return self.queryset.filter(user=user).select_related('subject__course')
