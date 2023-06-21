from django.db import models

from subjects.models import Subject
from timer.models import Pomodoro


STATUS = (
    ('pe', 'Pendiente'),
    ('ep', 'En progreso'),
    ('co', 'Completado'),
    ('sa', 'Saltado'),
)


class Task(models.Model):
    """Un modelo representando una tarea."""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(choices=STATUS, default='pe', max_length=20)
    user = models.ForeignKey('auth.User', related_name='tasks', on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, related_name='tasks', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)    
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    timer = models.OneToOneField(Pomodoro, related_name='task', on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        ordering = ['created']
        verbose_name = 'Tarea'
        verbose_name_plural = 'Tareas'

    def __str__(self):
        """Retorna el nombre de la tarea."""
        return self.name
    
    def get_total_time(self):
        """Retorna el tiempo total gastado en la tarea."""
        return self.timer.duration
