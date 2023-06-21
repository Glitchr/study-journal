from rest_framework import viewsets

from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """API endpoint para ver o editar las tareas de un usuario."""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
