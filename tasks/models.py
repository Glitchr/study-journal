from datetime import timedelta

from django.db import models
from django.utils.text import slugify

from subjects.models import Tema


STATUS = (
    ('pe', 'Pendiente'),
    ('ep', 'En progreso'),
    ('co', 'Completado'),
)


class Tarea(models.Model):
    """
    Un modelo representando tareas que se pueden crear, actualizar,
    ver y borrar.
    """
    nombre = models.CharField(max_length=100, blank=True)
    descripcion = models.TextField()
    deadline = models.DateTimeField(blank=True)
    status = models.CharField(choices=STATUS, default='pe', max_length=20)
    owner = models.ForeignKey('auth.User', related_name='tareas', on_delete=models.CASCADE)
    tema = models.ForeignKey(Tema, related_name='tareas', on_delete=models.CASCADE)
    creado = models.DateTimeField(auto_now_add=True)
    tiempo = models.DurationField(default=timedelta(25))
    pausado = models.DurationField(default=timedelta(5))
    total = models.DurationField(default=timedelta())

    class Meta:
        ordering = ['creado']
        verbose_name = 'tarea'
        verbose_name_plural = 'tareas'

    def __str__(self): 
        """Retorna el nombre de la tarea."""
        return self.nombre

    def save(self, *args, **kwargs):
        """Genera el slug a partir del nombre de la tarea."""
        self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)
