from django.db import models


NIVELES = (
    (1, 'Básico'),
    (2, 'Intermedio'),
    (3, 'Avanzado'),
)


class Achievement(models.Model):
    """Un modelo representando los logros de un usuario."""
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=200)
    badge = models.ImageField(upload_to='images/logros', null=True)
    bonus = models.IntegerField()
    level = models.IntegerField(choices=NIVELES)

    class Meta:
        verbose_name = 'Achievement'
        verbose_name_plural = 'Achievements'

    def __str__(self):
        """Retorna el nombre del logro."""
        return self.name


class UserAchievement(models.Model):
    """Un modelo representando la relacion entre usuarios y Logro."""
    user = models.ForeignKey('auth.User', related_name='user_achievements', on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, related_name='achievements', on_delete=models.CASCADE)
    date_achieved = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name='User Achievement'
        verbose_name_plural = 'User Achievements'

    def __str__(self):
        """Retorna el logro de un usuario con su fecha y nivel."""
        return f'{self.user.username} - {self.achievement}'
