from datetime import timedelta
from django.test import TestCase
from django.contrib.auth.models import User
from courses.models import Course
from categories.models import Category
from .models import Subject

class SubjectTestCase(TestCase):
    """Un caso de prueba para el modelo Subject."""

    def setUp(self):
        """Crea un usuario, una categoría, un curso y un tema para usar en las pruebas."""
        self.user = User.objects.create(username='testuser')
        self.category = Category.objects.create(name='Test Category')
        self.course = Course.objects.create(
            name='Test Course',
            description='This is a test course',
            category=self.category,
            user=self.user
        )
        self.subject = Subject.objects.create(
            name='Test Subject',
            course=self.course,
            user=self.user
        )

    def test_subject_str(self):
        """Prueba que el método __str__ del modelo Subject retorna el nombre del tema."""
        self.assertEqual(str(self.subject), 'Test Subject')

    def test_subject_get_progress(self):
        """Prueba que el método get_progress del modelo Subject retorna el progreso del tema."""
        # Test with no tasks
        self.assertEqual(self.subject.get_progress(), 0)

    def test_subject_update_status(self):
        """Prueba que el método update_status del modelo Subject actualiza el estado del tema."""
        # Test with no tasks
        self.subject.update_status()
        self.assertEqual(self.subject.status, 'pe')

    # def test_subject_get_total_time(self):
    #     """Prueba que el método get_total_time del modelo Subject retorna el tiempo total gastado en el tema."""
    #     # Test with no tasks
    #     self.assertEqual(self.subject.get_total_time(), timedelta())

