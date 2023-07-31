from django.test import TestCase
from rest_framework.test import APIRequestFactory, APITestCase, APIClient
from django.contrib.auth.models import User
from .models import Category
from .serializers import CategorySerializer
from django.urls import reverse
from rest_framework import status

class CategoryTestCase(TestCase):
    """Un caso de prueba para el modelo Category."""

    def setUp(self):
        """Crea una categoría para usar en las pruebas."""
        self.category = Category.objects.create(name='Test Category')

    def test_category_str(self):
        """Prueba que el método __str__ del modelo Category retorna el nombre de la categoría."""
        self.assertEqual(str(self.category), 'Test Category')


class CategorySerializerTestCase(TestCase):
    """Un caso de prueba para el serializador Category"""
    def setUp(self):
        self.factory = APIRequestFactory()
        self.category = Category.objects.create(name='Test Category')

    def test_category_serialization(self):
        """Test that a Category object is correctly serialized"""
        request = self.factory.get('/')
        serializer = CategorySerializer(self.category, context={'request': request})
        data = serializer.data
        self.assertEqual(data['name'], 'Test Category')


class CategoryViewSetTestCase(APITestCase):
    def setUp(self):
        self.staff_user = User.objects.create_user(username='staffuser', password='testpassword', is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.staff_user)
        self.category = Category.objects.create(name='Test Category')

    def tearDown(self):
        self.category.delete()

    def test_list_categories(self):
        """Prueba que se pueda recuperar la lista de categorías"""
        response = self.client.get('/api/categories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'Test Category')

    # def test_create_category(self):
    #     """Prueba que se pueda crear una nueva categoría"""
    #     url = '/api/categories/'
    #     data = {'name': 'New Category'}
    #     response = self.client.post(url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #     self.assertEqual(response.data['name'], 'New Category')
