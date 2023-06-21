from rest_framework import viewsets, permissions

from .serializers import AchievementSerializer, UserAchievementSerializer
from .models import Achievement, UserAchievement


class AchievementViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite ver la relacion entre el usuario y los logros.
    """
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class UserAchievementViewSet(viewsets.ModelViewSet):
    """API endpont que permite ver los logros."""
    queryset = UserAchievement.objects.all()
    serializer_class = UserAchievementSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
