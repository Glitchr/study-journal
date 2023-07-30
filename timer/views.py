from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Timer
from .serializers import TimerSerializer


class TimerViewSet(viewsets.ModelViewSet):
    """
    Un viewset que provee las operaciones CRUD para el temporizador.
    """
    queryset = Timer.objects.all()
    serializer_class = TimerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Retorna el queryset filtrado por el usuario actual."""
        return self.queryset.filter(user=self.request.user)
