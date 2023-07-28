from datetime import timedelta

from django.db import models
from django.db.models import Sum, F

from tasks.models import Task


class Timer(models.Model):
    """Un modelo que representa un temporizador pomodoro."""    
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    duration = models.IntegerField()
    is_running = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)
    task = models.ForeignKey(Task, related_name='task', on_delete=models.CASCADE, null=True, blank=True) 
    total_time = models.DurationField(default=timedelta())

    class Meta:
        ordering = ['created']

    @classmethod
    def total_time_spent(cls, user):
        """
        Calcula el tiempo total gastado en todos los temporizadores
        completados para el usuario especificado.
        """
        total_time = cls.objects.filter(user=user, is_completed=True).annotate(
            time_spent=F('end_time') - F('start_time')
        ).aggregate(Sum('time_spent'))['time_spent__sum']
        return total_time.total_seconds() if total_time else 0
