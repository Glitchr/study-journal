from django.test import TestCase
from django.contrib.auth.models import User
from courses.models import Course
from categories.models import Category
from subjects.models import Subject
from .models import Task

class TaskTestCase(TestCase):
    """Un caso de prueba para el modelo Task."""

    def setUp(self):
        """Crea un usuario, una categoría, un curso, un tema y una tarea para usar en las pruebas."""
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
        self.task = Task.objects.create(
            name='Test Task',
            subject=self.subject,
            user=self.user
        )

    def test_task_str(self):
        """Prueba que el método __str__ del modelo Task retorna el nombre de la tarea."""
        self.assertEqual(str(self.task), 'Test Task')
