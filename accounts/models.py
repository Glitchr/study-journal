from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from achievements.models import Achievement
from courses.models import Course
from subjects.models import Subject
from tasks.models import Task


class UserProfile(models.Model):
    """Un modelo que representa el perfil de un usuario."""
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='images/avatars', null=True)
    bio = models.TextField(blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)

    class Meta:
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            UserProfile.objects.create(user=instance)
    
    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()

    # def get_current_tasks(self):
    #     """Retorna las tareas del usuario con estado 'pendiente'."""
    #     current_tasks = Task.objects.filter(user=self.user, status='ep')
        
    #     return current_tasks
    
    # def get_current_subjects(self):
    #     """Retorna los temas del usuario con estado 'pendiente'."""
    #     current_subjects = Subject.objects.filter(user=self.user, status='ep')

    #     return current_subjects
    
    # def get_current_courses(self):
    #     """Retorna los cursos del usuario con estado 'pendiente."""
    #     current_courses = Course.objects.filter(user=self.user, status='ep')

    #     return current_courses
    
    # def get_current_achievements(self):
    #     """Retorna los logros del usuario."""
    #     current_achievements = Achievement.objects.filter(user=self.user)

    #     return current_achievements
