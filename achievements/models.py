from django.db import models
from django.utils.text import slugify


NIVELES = (
    (1, 'Básico'),
    (2, 'Intermedio'),
    (3, 'Avanzado'),
)


class Logro(models.Model):
    """Un modelo representando los logros de un usuario."""
    nombre = models.CharField(max_length=100, blank=False)
    descripcion = models.TextField()
    insignia = models.ImageField(upload_to='images/logros')
    nivel = models.IntegerField(choices=NIVELES)
    requisitos = models.TextField()
    owner = models.ManyToManyField('auth.User', related_name='logros', through='UserLogro')
    slug = models.SlugField(max_length=100, unique=True)

    class Meta:
        verbose_name = 'Logro'
        verbose_name_plural = 'Logros'

    def __str__(self):
        """Retorna el nombre del logro."""
        return self.nombre
    
    def save(self, *args, **kwargs):
        """Genera el slug a partir del nombre del logro."""
        self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)


class UserLogro(models.Model):
    """Un modelo representando la relacion entre usuarios y Logro."""
    user = models.ForeignKey('auth.User', related_name='userLogros', on_delete=models.CASCADE)
    logro = models.ForeignKey(Logro, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    nivel = models.IntegerField(choices=NIVELES)

    class Meta:
        verbose_name='User Logro'
        verbose_name_plural = 'User Logros'

    def __str__(self):
        """Retorna el logro de un usuario con su fecha y nivel."""
        return f'{self.user.username} - {self.logro.nombre} - {self.fecha} - {self.nivel}'
