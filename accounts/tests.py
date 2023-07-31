from django.test import TestCase
from django.contrib.auth.models import User, Group
from .models import UserProfile
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, GroupSerializer
from rest_framework.test import APIClient, APIRequestFactory, APITestCase
from rest_framework import status


class UserProfileTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='testuser', password='testpassword')
        self.profile = UserProfile.objects.get(user=self.user)

    def test_profile_creation(self):
        self.assertIsInstance(self.profile, UserProfile)
        self.assertEqual(self.profile.user, self.user)

    def test_profile_fields(self):
        self.profile.avatar = 'test_avatar.jpg'
        self.profile.bio = 'test_bio'
        self.profile.birth_date = '2000-01-01'
        self.profile.save()

        profile = UserProfile.objects.get(user=self.user)
        self.assertEqual(profile.avatar, 'test_avatar.jpg')
        self.assertEqual(profile.bio, 'test_bio')
        self.assertEqual(str(profile.birth_date), '2000-01-01')

    def test_auth_token_creation(self):
        token = Token.objects.get(user=self.user)
        self.assertIsInstance(token, Token)


class UserSerializerTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create(username='testuser', password='testpassword')
        self.profile = UserProfile.objects.get(user=self.user)
        self.profile.bio = None
        self.profile.birth_date = None
        self.profile.save()
        
        Group.objects.create(name='User')
        

    def test_user_serialization(self):
        request = self.factory.get('/')
        serializer = UserSerializer(self.user, context={'request': request})
        data = serializer.data
        self.assertEqual(data['username'], 'testuser')
        self.assertEqual(data['profile']['bio'], None)
        self.assertEqual(data['profile']['birth_date'], None)

    def test_user_creation(self):
        client = APIClient()
        response = client.post('/api/users/', {'username': 'newuser', 'email': 'newuser@example.com', 'password': 'newpassword', 'profile': {'bio': None, 'birth_date': None}}, format='json')
        user = User.objects.get(username='newuser')
        profile = UserProfile.objects.get(user=user)
        self.assertEqual(profile.bio, None)
        self.assertEqual(profile.birth_date, None)


class GroupSerializerTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.group = Group.objects.create(name='testgroup')


    def test_group_serialization(self):
        request = self.factory.get('/')
        serializer = GroupSerializer(self.group, context={'request': request})
        data = serializer.data
        self.assertEqual(data['name'], 'testgroup')
 

class UserViewSetTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.staff_user = User.objects.create_user(username='staffuser', password='testpassword', is_staff=True)
        self.group = Group.objects.create(name='User')

    def test_list_authenticated(self):
        """Test that an authenticated user can view their own information"""
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['username'], 'testuser')

    def test_list_unauthenticated(self):
        """Test that an unauthenticated user cannot view the list of users"""
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_staff(self):
        """Test that a staff user can view the list of all users"""
        self.client.force_authenticate(user=self.staff_user)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_user(self):
        """Test that a new user can be created and is automatically added to the 'User' group"""
        data = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "newpassword",
            "profile": {
                "avatar": None,
                "bio": None,
                "birth_date": None
            }
        }
        response = self.client.post('/api/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username='newuser')
        self.assertTrue(user.groups.filter(name='User').exists())

    # def test_retrieve_self(self):
    #     """Test that a user can retrieve their own information"""
    #     self.client.force_authenticate(user=self.user)
    #     response = self.client.get(f'/api/users/{self.user.id}')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_other(self):
        """Test that a user cannot retrieve information about another user"""
        self.client.force_authenticate(user=self.user)
        request = self.factory.get('/')
        serializer = UserSerializer(self.staff_user, context={'request': request})
        response = self.client.get(serializer.data['url'])   
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_staff(self):
        """Test that a staff user can retrieve information about any user"""
        self.client.force_authenticate(user=self.staff_user)
        request = self.factory.get('/')
        serializer = UserSerializer(self.user, context={'request': request})
        response = self.client.get(serializer.data['url'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

