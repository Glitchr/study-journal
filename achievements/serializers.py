from rest_framework import serializers

from .models import Achievement, Award


class AchievementSerializer(serializers.ModelSerializer):
    """Un serializador que muestra la relacion entre usuarios y logros."""

    class Meta:
        model = Achievement
        fields = ['id', 'name', 'description', 'badge', 'level', 'criteria']


class AwardSerializer(serializers.HyperlinkedModelSerializer):
    """Un serializador que muestra los logros."""
    achievements = AchievementSerializer(many=True, read_only=True)

    class Meta:
        model = Award
        fields = ['url', 'user', 'date_achieved', 'achievements']
