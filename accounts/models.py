from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfile(models.Model):
    """Un modelo que representa el perfil de un usuario."""
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='images/avatars')
    bio = models.TextField()
    birth_date = models.DateField(null=True, blank=True)

    class Meta:
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'

    @receiver(post_save, sender=User)
    def crear_user_profile(sender, instance, created, **kwargs):
        if created:
            UserProfile.objects.create(user=instance)
    
    @receiver(post_save, sender=User)
    def guardar_user_profile(sender, instance, **kwargs):
        instance.profile.save()
    