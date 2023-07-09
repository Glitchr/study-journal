from rest_framework import viewsets, permissions

from .serializers import CategorySerializer
from .models import Category


class CategoryViewSet(viewsets.ModelViewSet):
    """API endpoint que permite ver o editar las categorias."""
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]
