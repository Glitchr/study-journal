from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from .models import Subject
from tasks.serializers import TaskSerializer


class SubjectSerializer(serializers.HyperlinkedModelSerializer):
    """Un serializador para el modelo Tema."""
    user = serializers.HiddenField(default=CurrentUserDefault())
    tasks = TaskSerializer(many=True, read_only=True)
    total_time = serializers.DurationField(read_only=True)

    class Meta:
        model = Subject
        fields = [
            'url', 'name', 'description', 'user', 'created', 'status',
            'course', 'start_date', 'end_date', 'tasks', 'total_time',
        ]
