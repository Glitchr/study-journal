from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Tarea, Tema, Curso, Progreso, Logro, UserLogro, Categoria


class TareaSerializer(serializers.HyperlinkedModelSerializer):

    owner = serializers.ReadOnlyField(source='owner.username')
    
    class Meta:
        model = Tarea
        fields = '__all__'


class TemaSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Tema
        fields = '__all__'


class CursoSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Curso
        fields = '__all__'


class ProgresoSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Progreso
        fields = '__all__'
    

class LogroSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Logro
        fields = '__all__'


class UserLogroSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = UserLogro
        fields = '__all__'


class CategoriaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Categoria
        fields = ['nombre']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    tareas = serializers.HyperlinkedRelatedField(many=True,
                                                 view_name='tareas-detail',
                                                 read_only=True)
    temas = serializers.HyperlinkedRelatedField(many=True,
                                                view_name='temas-detail'
                                                read_only=True)
    cursos = serializers.HyperlinkedRelatedField(many=True,
                                                 view_name='cursos-detail',
                                                 read_only=True)
    progreso = serializers.HyperlinkedRelatedField(many=True,
                                                   view_name='progreso-detail',
                                                   read_only=True)
    logros = serializers.HyperlinkedRelatedField(many=True,
                                                view_name='logros-detail',
                                                read_only=True)
    user_logros = serializers.HyperlinkedRelatedField(many=True,
                                                      view_name='userlogros-detail',
                                                      read_only=True)
