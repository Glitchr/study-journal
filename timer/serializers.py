from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from .models import Pomodoro


class PomodoroSerializer(serializers.ModelSerializer):
    """
    Un serializador que provee el formato de entrada y salida del temporizador.
    """
    user = serializers.HiddenField(default=CurrentUserDefault())
    remaining_time = serializers.SerializerMethodField()
    task = serializers.ReadOnlyField(source='task.id')
    start = serializers.SerializerMethodField()
    stop = serializers.SerializerMethodField()
    pause = serializers.SerializerMethodField()
    resume = serializers.SerializerMethodField()
    start_break = serializers.SerializerMethodField()
    stop_break = serializers.SerializerMethodField()
    resume_break = serializers.SerializerMethodField()

    class Meta:
        model = Pomodoro
        fields = [
            'user', 'start_time', 'end_time', 'duration', 'break_duration', 
            'on_break', 'remaining_time', 'task', 'start', 'stop', 'pause',
            'resume', 'start_break', 'stop_break', 'resume_break',
        ]
        read_only_fields = [
            'start_time', 'end_time', 'duration', 'break_duration', 
            'on_break', 'remaining_time', 'task', 'start', 'stop', 'pause',
            'resume', 'start_break', 'stop_break', 'resume_break',
        ]

    def get_remaining_time(self, obj):
        """Retorna el tiempo faltante en segundos."""
        return obj.get_remaining_time()

    def get_start(self, obj):
        """Comienza el temporizador."""
        return obj.start()

    def get_stop(self, obj):
        """Para el temporizador."""
        return obj.stop()

    def get_pause(self, obj):
        """Pausa el temporizador."""
        return obj.pause()

    def get_resume(self, obj):
        """Resume el temporizador."""
        return obj.resume()

    def get_start_break(self, obj):
        """Comienza el descanso."""
        return obj.start_break()

    def get_stop_break(self, obj):
        """Para el descanso y comienza la proxima sesion."""
        return obj.stop_break()

    def get_resume_break(self, obj):
        """Resume el descanso."""
        return obj.resume_break()
