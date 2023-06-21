from django.db import models


class Category(models.Model):
    """Un modelo representando las categorias de las asignatuas y cursos."""
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        """Retorna el nombre de la categoria."""
        return self.name
