from django.db.models import Sum

from .models import Achievement, Award
from courses.models import Course
from subjects.models import Subject
from tasks.models import Task
from timer.models import Timer


class AchievementChecker:
    def __init__(self, user):
        self.user = user

    def check_achievements(self):
        self.check_task_completion()
        self.check_course_subject_task_creation()
        self.check_task_total_time()

    def check_task_completion(self):
        achievements = Achievement.objects.filter(criteria__has_key='tasks_completed')
        for achievement in achievements:
            tasks_completed = Task.objects.filter(user=self.user, status='co').count()
            if tasks_completed >= achievement.criteria['tasks_completed']:
                Award.objects.get_or_create(user=self.user, achievement=achievement)

    def check_course_subject_task_creation(self):
        achievements = Achievement.objects.filter(criteria__has_key='created_course_subject_task')
        for achievement in achievements:
            course = Course.objects.filter(user=self.user).exists()
            subject = Subject.objects.filter(course__user=self.user).exists()
            task = Task.objects.filter(subject__course__user=self.user).exists()
            if course and subject and task:
                Award.objects.get_or_create(user=self.user, achievement=achievement)

    def check_task_total_time(self):
        achievements = Achievement.objects.filter(criteria__has_key='task_total_time_one')
        for achievement in achievements:
            tasks = Task.objects.filter(user=self.user)
            for task in tasks:
                total_time = Timer.objects.filter(task=task, is_completed=True).aggregate(
                    Sum('total_time')
                )['total_time__sum']
                if total_time and total_time.total_seconds() >= achievement.criteria['task_total_time']:
                    Award.objects.get_or_create(user=self.user, task=task, achievement=achievement)
