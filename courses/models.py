from datetime import timedelta

from django.db import models

from categories.models import Category


STATUS = (
    ('pe', 'Pendiente'),
    ('ep', 'En progreso'),
    ('co', 'Completado'),
    ('sa', 'Saltado'),
)


class Course(models.Model):
    """Un modelo representando un curso."""
    name = models.CharField(max_length=100, blank=False)
    description = models.TextField()
    status = models.CharField(choices=STATUS, default='pe', max_length=20)
    category = models.ForeignKey(Category, related_name='courses', on_delete=models.CASCADE)
    user = models.ForeignKey('auth.User', related_name='courses', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ['created']
        verbose_name = 'Course'
        verbose_name_plural = 'Courses'

    def __str__(self):
        """Retorna el nombre del curso."""
        return self.name

    def get_progress(self):
        """Retorna el progreso del curso en numero decimal."""
        total_subjects = self.subjects.count()
        completed_subjects = self.subjects.filter(status='co').count()
        total_tasks = 0
        completed_tasks = 0
        for subject in self.subjects.all():
            total_tasks += subject.tasks.count()
            completed_tasks += subject.get_progress() * subject.tasks.count()

        if total_subjects > 0 and total_tasks > 0:
            return (completed_subjects / total_subjects + completed_tasks / total_tasks) / 2
        elif total_subjects > 0:
            return completed_subjects / total_subjects
        elif total_tasks > 0:
            return completed_tasks / total_tasks
        else:
            return 0

    def update_status(self):
        """Actualiza el status del curso dependiendo del progreso."""
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
