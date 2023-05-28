from datetime import timedelta

from django.db import models
from django.utils.text import slugify

from categories.models import Categoria


class Curso(models.Model):
    """Un modelo representando un curso."""
    nombre = models.CharField(max_length=100, blank=False)
    descripcion = models.TextField()
    categoria = models.ForeignKey(Categoria, related_name='cursos', on_delete=models.CASCADE)
    owner = models.ForeignKey('auth.User', related_name='cursos', on_delete=models.CASCADE)
    creado = models.DateTimeField(auto_now_add=True)
    total = models.DurationField(default=timedelta())
    slug = models.SlugField(max_length=100, unique=True)

    class Meta:
        ordering = ['creado']
        verbose_name = 'Curso'
        verbose_name_plural = 'Cursos'

    def __str__(self):
        """Retorna el nombre del curso."""
        return self.nombre
    
    def save(self, *args, **kwargs):
        """Genera el slug a partir del nombre del curso"""
        self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)
