from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Tarea


class TareaSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    url = serializers.HyperlinkedRelatedField(view_name='tarea-detail')

    class Meta:
        model = Tarea
        fields = [
            'url', 'nombre', 'descripcion', 'deadline', 'status', 'owner',
            'tema', 'creado', 'tiempo', 'pausado', 'total', 'slug',
            ]
