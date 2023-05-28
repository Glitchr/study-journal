from django.db import models

from tasks.models import Tarea, STATUS
from subjects.models import Tema
from courses.models import Curso


class Progreso(models.Model):
    """Un modelo representando el progreso de un usuario."""
    status =models.CharField(choices=STATUS, default='pe', max_length=20)
    puntuacion = models.FloatField()
    feedback = models.TextField()
    owner = models.ForeignKey('auth.User', related_name='progresos', on_delete=models.CASCADE)
    tarea = models.ForeignKey(Tarea, related_name='tareas', on_delete=models.CASCADE)
    tema = models.ForeignKey(Tema, related_name='temas', on_delete=models.CASCADE)
    curso = models.ForeignKey(Curso, related_name='cursos', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Progreso'
        verbose_name_plural = 'Progresos'

    def __str__(self):
        """Retorna el progreso de un usuario en una tarea, tema o curso."""
        return f'{self.owner.username} - {self.tarea.nombre or self.tema.nombre or self.curso.nombre}'
    
    def save(self, *args, **kwargs):
        """Actualiza el status del progreso segun el status de la tarea."""
        self.status = self.tarea.status
        super().save(*args, **kwargs)
    