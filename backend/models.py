from django.db import models
from django.utils.text import slugify


STATUS = (
    ('pe', 'Pendiente'),
    ('ep', 'En progreso'),
    ('co', 'Completada'),
)
NIVELES = (
    (1, 'Básico'),
    (2, 'Intermedio'),
    (3, 'Avanzado'),
)


class Tarea(models.Model):
    """Un modelo representando una tarea."""
    nombre = models.CharField(max_length=100, required=True)
    descripcion = models.TextField()
    deadline = models.DateTimeField(blank=True)
    status = models.CharField(choices=STATUS, default='pe', max_length=20)
    owner = models.ForeignKey('auth.User', related_name='tareas', on_delete=models.CASCADE)
    creado = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=100, unique=True)

    class Meta:
        ordering = ['creado']
        Verbose_name = 'Tarea'
        verbose_name_plural = 'Tareas'

    def __str__(self):
        """Retorna el nombre de la tarea."""
        return self.nombre
    
    def save(self, *args, **kwargs):
        """Genera el slug a partir del nombre de la tarea"""
        self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)


class Tema(models.Model):
    """Un modelo representando un tema."""
    nombre = models.CharField(max_length=100, required=True)
    descripcion = models.TextField()
    categoria = models.ForeignKey(Categoria, related_name='temas', on_delete=models.CASCADE, blank=False)
    owner = models.ForeignKey('auth.User', related_name='temas', on_delete=models.CASCADE)
    creado = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=100, unique=True)

    class Meta:
        ordering = ['creado']
        verbose_name = 'Tema'
        verbose_name_plural = 'Temas'

    def __str__(self):
        """Retorna el nombre del tema."""
        return self.nombre
    
    def save(self, *args, **kwargs):
        """Genera el slug a partir del nombre de la asignatura"""
        self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)


class Curso(models.Model):
    """Un modelo representando un curso."""
    nombre = models.CharField(max_length=100, required=True)
    descripcion = models.TextField()
    categoria = models.ForeignKey(Categoria, related_name='cursos', on_delete=models.CASCADE)
    owner = models.ForeignKey('auth.User', related_name='cursos', on_delete=models.CASCADE)
    creado = models.DateTimeField(auto_now_add=True)
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

 
class Progreso(models.Model):
    """Un modelo representando el progreso de un usuario."""
    status = models.CharField(choices=STATUS, default='pe', max_length=20)
    puntuacion = models.FloatField()
    feedback = models.TextField()
    owner = models.ForeignKey('auth.User', related_name='progreso', on_delete=models.CASCADE)
    tarea = models.ForeignKey(Tarea, related_name='tareas', on_delete=models.CASCADE)
    curso = models.ForeignKey(Curso, related_name='cursos', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Progreso'
        verbose_name_plural = 'Progresos'
    
    def __str__(self):
        """Retorna el progreso de un usuario en una tarea o un curso."""
        return f'{self.owner.username} - {self.tarea.nombre or self.curso.nombre}'
    
    def save(self, *args, **kwargs):
        """Actualize el status del progreso segun el status de la tarea."""
        self.status = self.tarea.status
        super().save(*args, **kwargs)


class Logro(models.Model):
    """Un modelo representando los logros de un usuario."""
    nombre = models.CharField(max_length=100, required=True)
    descripcion = models.TextField()
    insignia = models.ImageField()
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
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    logro = models.ForeignKey(Logro, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    nivel = models.IntegerField(choices=NIVELES)

    class Meta:
        verbose_name = 'UserLogro'
        verbose_name_plural = 'UserLogros'

    def __str__(self):
        """Retorna el logro de un usuario con su fecha y nivel."""
        return f'{self.user.username} - {self.logro.nombre} - {self.fecha} - {self.nivel}'


class Categoria(models.Model):
    """Un modelo representando las categorias de las asignaturas y cursos."""
    nombre = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'

    def __str__(self):
        """Retorna el nombre de la categoria"""
        return self.nombre
