from django.db.models.signals import post_save
from django.dispatch import receiver

from achievements.achievement_checker import AchievementChecker
from courses.models import Course
from subjects.models import Subject
from tasks.models import Task
from timer.models import Timer


@receiver(post_save, sender=Course)
def check_course_achievements(sender, instance, created, **kwargs):
    user = instance.user
    checker = AchievementChecker(user)
    checker.check_achievements()


@receiver(post_save, sender=Subject)
def check_subject_achievements(sender, instance, created, **kwargs):
    user = instance.user
    checker = AchievementChecker(user)
    checker.check_achievements()


@receiver(post_save, sender=Task)
def check_task_achievements(sender, instance, created, **kwargs):
    user = instance.user
    checker = AchievementChecker(user)
    checker.check_achievements()


@receiver(post_save, sender=Timer)
def check_timer_achievements(sender, instance, created, **kwargs):
    user = instance.user
    checker = AchievementChecker(user)
    checker.check_achievements()
