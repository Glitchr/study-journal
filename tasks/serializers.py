from django.db.models import Sum, F
from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from .models import Task
from timer.models import Timer
from timer.serializers import TimerSerializer


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    """API endpoint para ver o editar las tareas de un usuario."""
    user = serializers.HiddenField(default=CurrentUserDefault())
    timer = TimerSerializer(many=True, read_only=True)
    total_time = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [
            'url', 'user', 'name', 'description', 'due_date', 'status',
            'created', 'subject', 'start_date', 'end_date', 'total_time', 
            'timer',
        ]
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')
        if request:
            user = request.user
            if not user.is_staff:
                self.fields['subject'].queryset = self.fields['subject'].queryset.filter(user=user)

    def get_total_time(self, obj):
        """Calcula el tiempo total dedicado en el temporizador."""
        total_time = Timer.objects.filter(task=obj, is_completed=True).aggregate(
            Sum('total_time')
        )['total_time__sum']
        return total_time.total_seconds() if total_time else 0
