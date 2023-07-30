from rest_framework import viewsets, permissions

from .serializers import AchievementSerializer, AwardSerializer
from .models import Achievement, Award


class AchievementViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite ver la relacion entre el usuario y los logros.
    """
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAdminUser]


class AwardViewSet(viewsets.ModelViewSet):
    """API endpont que permite ver los premios."""
    queryset = Award.objects.all()
    serializer_class = AwardSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
