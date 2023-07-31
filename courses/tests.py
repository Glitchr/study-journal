from datetime import timedelta
from django.test import TestCase
from django.contrib.auth.models import User
from categories.models import Category
from .models import Course

class CourseTestCase(TestCase):
    """Un caso de prueba para el modelo Course."""

    def setUp(self):
        """Crea un usuario, una categoría y un curso para usar en las pruebas."""
        self.user = User.objects.create(username='testuser')
        self.category = Category.objects.create(name='Test Category')
        self.course = Course.objects.create(
            name='Test Course',
            description='This is a test course',
            category=self.category,
            user=self.user
        )

    def test_course_str(self):
        """Prueba que el método __str__ del modelo Course retorna el nombre del curso."""
        self.assertEqual(str(self.course), 'Test Course')

    def test_course_get_progress(self):
        """Prueba que el método get_progress del modelo Course retorna el progreso del curso."""
        # Test with no subjects
        self.assertEqual(self.course.get_progress(), 0)

    def test_course_update_status(self):
        """Prueba que el método update_status del modelo Course actualiza el estado del curso."""
        # Test with no subjects
        self.course.update_status()
        self.assertEqual(self.course.status, 'pe')

    # def test_course_get_total_time(self):
    #     """Prueba que el método get_total_time del modelo Course retorna el tiempo total gastado en el curso."""
    #     # Test with no subjects or tasks
    #     self.assertEqual(self.course.get_total_time(), timedelta())
