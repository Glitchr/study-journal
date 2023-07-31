from datetime import timedelta
from django.test import TestCase
from django.contrib.auth.models import User
from django.utils import timezone
from categories.models import Category
from courses.models import Course
from subjects.models import Subject
from tasks.models import Task
from .models import Timer


class TimerTestCase(TestCase):
    """Prueba unitaria para el modelo Timer."""
    def setUp(self):
        self.user = User.objects.create(username='testuser')
        self.category = Category.objects.create(name='test category',)
        self.course = Course.objects.create(name='Test Course', user=self.user, category=self.category)
        self.subject = Subject.objects.create(name='Test Subject', user=self.user, course=self.course)
        self.task = Task.objects.create(name='Test Task', user=self.user, subject=self.subject)
        self.timer = Timer.objects.create(
            user=self.user,
            start_time=timezone.now(),
            end_time=timezone.now() + timedelta(minutes=25),
            duration=25,
            is_running=False,
            is_completed=True,
            task=self.task
        )

    def test_total_time_spent(self):
        """
        Prueba que el método total_time_spent devuelva el tiempo total gastado en todos los temporizadores completados para el usuario especificado.
        """
        total_time_spent = Timer.total_time_spent(self.user)
        self.assertEqual(total_time_spent, 1500)
