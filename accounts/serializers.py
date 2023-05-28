from django.contrib.auth.models import User, Group
from rest_framework import serializers

from .models import UserProfile


class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    """
    Un serializador para el modelo UserProfile que incluye
    los campos relacionados.
    """
    tareas = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    temas = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    cursos = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    progreso = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    logros = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    user_logros = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = ['tareas', 'temas', 'cursos', 'progreso', 'logros', 'user_logros']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """Un serializador para el modelo User que incluye el campo de avatar."""
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'profile']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    """Un serializador para el modelo Group que incluye el campo de name."""
    class Meta:
        model = Group
        fields = ['url', 'name']
