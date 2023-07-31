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
        if 'is_running' in validated_data and 'is_completed' in validated_data:
            if validated_data['is_completed']:
                validated_data['end_time'] = timezone.now()
                instance.total_time += validated_data['end_time'] - instance.start_time
                print(f'is_completed: {instance.total_time}')
            if validated_data['is_running']:
                validated_data['start_time'] = timezone.now()
                print(f'is_running: {instance.total_time}')
        elif 'is_running' in validated_data:
            if validated_data['is_running']:
                validated_data['start_time'] = timezone.now()
                print(f'is_running: {instance.total_time}')
            else:
                validated_data['end_time'] = timezone.now()
                instance.total_time += validated_data['end_time'] - instance.start_time
                instance.save()
                print(f'is_not_running: {instance.total_time}')
        elif 'is_completed' in validated_data:
            if validated_data['is_completed']:
                validated_data['end_time'] = timezone.now()
                instance.total_time += validated_data['end_time'] - instance.start_time
                instance.save()
                print(f'is_completed: {instance.total_time}')
        return super().update(instance, validated_data)
