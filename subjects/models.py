from datetime import timedelta

from django.db import models

from courses.models import Course


STATUS = (
    ('pe', 'Pendiente'),
    ('ep', 'En progreso'),
    ('co', 'Completado'),
    ('sa', 'Saltado'),
)


class Subject(models.Model):
    """Un modelo representando un tema."""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(choices=STATUS, default='pe', max_length=20)
    user = models.ForeignKey('auth.User', related_name='subjects', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='subjects', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)    
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ['created']
        verbose_name = 'Tema'
        verbose_name_plural = 'Temas'
     
    def __str__(self):
        """Retorna el nombre del tema."""
        return self.name
    
    def get_progress(self):
        """Retorna el progreso del tema en numero decimal"""
        total_tasks = self.tasks.count()
        completed_tasks = self.tasks.filter(status='co').count()

        if total_tasks > 0:
            return completed_tasks / total_tasks
        else:
            return 0

    def update_status(self):
        """Actualiza el status del tema dependiendo del progreso."""
        progress = self.get_progress()
        # If the progress is zero, set the status to 'Pendiente'.
        if progress == 0:
            self.status = 'pe'
        # If the progress is between zero and one, set the status to 'En progreso'.
        elif 0 < progress < 1:
            self.status = 'ep'
        # If the progress is one, set the status to 'Completado'.
        elif progress == 1:
            self.status = 'co'
        self.save()

    def get_total_time(self):
        """Retorna el tiempo total gastado en el tema."""
        total_time = timedelta()
        for task in self.tasks.all():
            total_time += task.timer.duration
        return total_time
