from django.db import models


class Categoria(models.Model):
    """Un modelo representando las categorias de las asignatuas y cursos."""
    nombre = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'

    def __str__(self):
        """Retorna el nombre de la categoria."""
        return self.nombre
