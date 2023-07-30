from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from .validators import validate_file_extension


NIVELES = (
    (1, 'Básico'),
    (2, 'Intermedio'),
    (3, 'Avanzado'),
)


class Achievement(models.Model):
    """Un modelo representando los logros de un usuario."""
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=200)
    badge = models.FileField('Image', upload_to='static/images/achievements',
                             validators=[validate_file_extension], null=True)
    criteria = models.JSONField(blank=True, null=True)
    level = models.IntegerField(choices=NIVELES)

    class Meta:
        verbose_name = 'Logro'
        verbose_name_plural = 'Logros'

    def __str__(self):
        """Retorna el nombre del logro."""
        return self.name


class Award(models.Model):
    """Un modelo representando la relacion entre usuarios y Logro."""
    user = models.ForeignKey('auth.User', related_name='user_achievements', on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, related_name='achievements', on_delete=models.CASCADE)
    date_achieved = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name='Premio'
        verbose_name_plural = 'Premios'

    def __str__(self):
        """Retorna el logro de un usuario con su fecha y nivel."""
        return f'{self.user.username} - {self.achievement}'


@receiver(post_save, sender=Award)
def send_achievement_notification(sender, instance, created, **kwargs):
    """
    Envía una notificación al usuario cuando se ha creado un nuevo premio.
    """
    if created:
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'user_{instance.user.id}',
            {
                'type': 'achievement_notification',
                'achievement': {
                    'name': instance.achievement.name,
                    'description': instance.achievement.description,
                    'badge': instance.achievement.badge.url
                }
            }
        )
