from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions

from .serializers import UserSerializer, GroupSerializer, UserProfileSerializer
from .models import UserProfile



class UserViewSet(viewsets.ModelViewSet):
    """API endpoint que permite ver o editar a los usuarios."""
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """API endpoint que permite ver o editar los grupos."""
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserProfileViewSet(viewsets.ModelViewSet):
    """API endpoint que permite ver o editar los perfiles."""
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    