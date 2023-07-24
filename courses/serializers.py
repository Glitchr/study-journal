from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from .models import Course
from subjects.serializers import SubjectSerializer


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    """Un serializador para el modelo Curso."""
    subjects = SubjectSerializer(many=True, read_only=True)
    user = serializers.HiddenField(default=CurrentUserDefault())
    total_time = serializers.DurationField(read_only=True)

    class Meta:
        model = Course
        fields = [
            'url', 'user', 'name', 'description', 'category', 'status',
             'created', 'start_date', 'end_date', 'subjects', 'total_time',
        ]
