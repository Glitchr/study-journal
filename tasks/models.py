from django.db import models

from subjects.models import Subject


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

    class Meta:
        ordering = ['created']
        verbose_name = 'Tarea'
        verbose_name_plural = 'Tareas'

    def __str__(self):
        """Retorna el nombre de la tarea."""
        return self.name
