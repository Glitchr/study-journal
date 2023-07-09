from django.contrib.auth.models import User, Group
from rest_framework import serializers

from .models import UserProfile
from courses.serializers import CourseSerializer


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Un serializador para el modelo UserProfile que incluye
    los campos relacionados.
    """
    class Meta:
        model = UserProfile
        fields = ['avatar', 'bio', 'birth_date']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """Un serializador para el modelo User que incluye el campo de avatar."""
    profile = UserProfileSerializer()
    courses = CourseSerializer(many=True, read_only=True)    

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'profile', 'courses']

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.get_or_create(user=user, defaults=profile_data)
        return user


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    """Un serializador para el modelo Group que incluye el campo de name."""
    class Meta:
        model = Group
        fields = ['url', 'name']
