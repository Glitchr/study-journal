from rest_framework import serializers

from .models import Achievement, UserAchievement


class AchievementSerializer(serializers.ModelSerializer):
    """Un serializador que muestra la relacion entre usuarios y logros."""

    class Meta:
        model = Achievement
        fields = ['name', 'description', 'badge', 'bonus', 'level']


class UserAchievementSerializer(serializers.HyperlinkedModelSerializer):
    """Un serializador que muestra los logros."""
    achievements = AchievementSerializer(many=True, read_only=True)

    class Meta:
        model = UserAchievement
        fields = ['url', 'user', 'date_achieved', 'achievements']
