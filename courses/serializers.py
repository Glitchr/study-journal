from datetime import timedelta

from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from .models import Course
from subjects.serializers import SubjectSerializer


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    """Un serializador para el modelo Curso."""
    subjects = SubjectSerializer(many=True, read_only=True)
    user = serializers.HiddenField(default=CurrentUserDefault())
    total_time = serializers.SerializerMethodField()
    progress = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'url', 'user', 'name', 'description', 'category', 'status',
            'created', 'start_date', 'end_date', 'progress', 'total_time', 
            'subjects', 
        ]

    def get_progress(self, obj):
        return obj.get_progress()

    def get_total_time(self, obj):
        total_time = timedelta()
        for subject in obj.subjects.all():
            subject_serializer = SubjectSerializer(subject, context=self.context)
            total_time += timedelta(seconds=subject_serializer.data['total_time'].total_seconds())
        return total_time
