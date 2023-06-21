from datetime import timedelta, datetime

from django.db import models
from django.core.validators import MinValueValidator


class Pomodoro(models.Model):
    """Un modelo que representa un temporizador pomodoro."""
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    duration = models.DurationField()
    break_duration = models.DurationField(default=timedelta(minutes=5), validators=[MinValueValidator(timedelta(seconds=1))])
    on_break = models.BooleanField(default=False)

    def __str__(self):
        """Retorna el string del modelo."""
        return f"Pomodoro {self.id}"
    
    def start(self):
        """Comienza el temporizador."""
        self.start_time = datetime.now()
        self.end_time = self.start_time + self.duration
        self.on_break = False
        self.save()
    
    def stop(self):
        """Para el temporizador."""
        self.end_time = datetime.now()
        self.duration -= (self.end_time - self.start_time)
        self.on_break = False
        self.save()

    def pause(self):
        """Pausa el temporizador."""
        self.end_time = datetime.now()
        self.duration -= (self.end_time - self.start_time)
        self.on_break = False
        self.save()
    
    def resume(self):
        """Resume el temporizador."""
        self.start_time = datetime.now()
        self.end_time = self.start_time + self.duration
        self.on_break = False
        self.save()

    def start_break(self):
        """Comienza el descanso."""
        if not self.on_break:
            self.start_time = datetime.now()
            self.end_time = self.start_time + self.break_duration
            self.on_break = True
            self.save()

    def stop_break(self):
        """Para el descanso y comienza la proxima sesion."""
        if self.on_break:
            self.end_time = datetime.now()
            self.break_duration -= (self.end_time - self.start_time)
            if self.break_duration <= timedelta(seconds=0):
                # Termino el descanso, empieza la proxima sesion.
                self.start()
            else:
                # Aun no termina el descanso, se pausa.
                self.on_break = False
                self.save()

    def resume_break(self):
        """Resume el descanso."""
        if not self.on_break:
            self.start_time = datetime.now()
            self.end_time = self.start_time + self.break_duration
            self.on_break = True
            self.save()
    
    def get_remaining_time(self):
        """Retorna el tiempo faltante en segundos."""
        return max(0, (self.end_time - datetime.now()).total_seconds())
