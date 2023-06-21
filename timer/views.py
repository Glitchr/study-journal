from rest_framework import viewsets, permissions

from .models import Pomodoro
from .serializers import PomodoroSerializer


class PomodoroViewSet(viewsets.ModelViewSet):
    """
    Un viewset que provee las operaciones CRUD para el temporizador.
    """
    queryset = Pomodoro.objects.all()
    serializer_class = PomodoroSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Retorna el queryset filtrado por el usuario actual."""
        return self.queryset.filter(user=self.request.user)