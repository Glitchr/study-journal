from django.utils import timezone
from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from .models import Timer


class TimerSerializer(serializers.HyperlinkedModelSerializer):
    """
    Un serializador que provee el formato de entrada y salida del temporizador.
    """
    user = serializers.HiddenField(default=CurrentUserDefault())
    
    class Meta:
        model = Timer
        fields = [
            'url','user', 'task', 'start_time', 'end_time', 'duration',
            'is_running', 'is_completed'
        ]
        read_only_fields = [
            'start_time', 'end_time',
        ]

    def create(self, validated_data):
        validated_data['start_time'] = timezone.now()
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        if 'is_running' in validated_data:
            if validated_data['is_running']:
                validated_data['start_time'] = timezone.now()
            else:
                validated_data['end_time'] = timezone.now()
                instance.total_time += validated_data['end_time'] - instance.start_time
        if validated_data.get('is_completed'):
            validated_data['end_time'] = timezone.now()
            instance.total_time += validated_data['end_time'] - instance.start_time
        return super().update(instance, validated_data)
