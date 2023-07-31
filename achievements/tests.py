from django.contrib.auth.models import User
from django.test import TestCase
from .models import Achievement, Award


class AchievementTest(TestCase):
    """Pruebas unitarias para el modelo `Achievement`."""
    def test_create_achievement(self):
        """Prueba que se puede crear un logro."""
        achievement = Achievement.objects.create(
            name='Logro 1',
            description='Este es el primer logro.',
            badge='badge.png',
            criteria='{"score": 100}',
            level=2
        )

        self.assertEqual(achievement.name, 'Logro 1')
        self.assertEqual(achievement.description, 'Este es el primer logro.')
        self.assertEqual(achievement.badge.name, 'badge.png')
        self.assertEqual(achievement.criteria, '{"score": 100}')
        self.assertEqual(achievement.level, 2)

    def test_create_award(self):
        """Prueba que se puede crear un premio."""
        user = User.objects.create(username='test_user')
        achievement = Achievement.objects.create(
            name='Logro 1',
            description='Este es el primer logro.',
            badge='badge.png',
            criteria='{"score": 100}',
            level=2
        )
        award = Award.objects.create(
            user=user,
            achievement=achievement,
        )

        self.assertEqual(award.user, user)
        self.assertEqual(award.achievement, achievement)
