from datetime import timedelta

from django.db import models
from django.utils.text import slugify

from courses.models import Curso


class Tema(models.Model):
    """Un modelo representando un tema."""
    nombre = models.CharField(max_length=100, blank=True)
    descripcion = models.TextField()
    owner = models.ForeignKey('auth.User', related_name='temas', on_delete=models.CASCADE)
    creado = models.DateTimeField(auto_now_add=True)
    curso = models.ForeignKey(Curso, related_name='temas', on_delete=models.CASCADE)
    total = models.DurationField(default=timedelta())
    slug = models.SlugField(max_length=100, unique=True)

    class Meta:
        ordering = ['creado']
        verbose_name = 'Tema'
        verbose_name_plural = 'Temas'
     
    def __str__(self):
        """Retorna el nombre del tema."""
        return self.nombre
    
    def save(self, *args, **kwargs):
        """Genera el slug a partir del nombre de la asignatura."""
        self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)
