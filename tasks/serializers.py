from datetime import timedelta

from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from .models import Task
from timer.models import Pomodoro
from timer.serializers import PomodoroSerializer # import the serializer for the timer model


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    """API endpoint para ver o editar las tareas de un usuario."""
    user = serializers.HiddenField(default=CurrentUserDefault())
    total_time = serializers.DurationField(read_only=True)

    class Meta:
        model = Task
        fields = [
            'url', 'user', 'name', 'description', 'due_date', 'status',
            'created', 'subject', 'start_date', 'end_date', 'total_time',
        ]
