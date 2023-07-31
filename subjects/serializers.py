from datetime import timedelta

from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from .models import Subject
from tasks.serializers import TaskSerializer


class SubjectSerializer(serializers.HyperlinkedModelSerializer):
    """Un serializador para el modelo Tema."""
    user = serializers.HiddenField(default=CurrentUserDefault())
    tasks = TaskSerializer(many=True, read_only=True)
    progress = serializers.SerializerMethodField()
    total_time = serializers.SerializerMethodField()

    class Meta:
        model = Subject
        fields = [
            'url', 'name', 'description', 'user', 'created', 'status',
            'course', 'start_date', 'end_date','progress', 'total_time', 'tasks',
        ]
  
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')
        if request:
            user = request.user
            if not user.is_staff:
                self.fields['course'].queryset = self.fields['course'].queryset.filter(user=user)

    def get_progress(self, obj):
        return obj.get_progress()

    def get_total_time(self, obj):
        total_time = timedelta()
        for task in obj.tasks.all():
            task_serializer = TaskSerializer(task, context=self.context)
            total_time += timedelta(seconds=task_serializer.data['total_time'])
        return total_time
