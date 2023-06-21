"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from accounts.views import UserViewSet, GroupViewSet
from achievements.views import AchievementViewSet
from categories.views import CategoryViewSet
from courses.views import CourseViewSet
from subjects.views import SubjectViewSet
from tasks.views import TaskViewSet
from timer.views import PomodoroViewSet

router = routers.DefaultRouter()
# Accounts app
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
# Achievements app
router.register(r'achievements', AchievementViewSet)
# Categories app
router.register(r'categories', CategoryViewSet)
# Courses app
router.register(r'courses', CourseViewSet)
# Subjects app
router.register(r'subjects', SubjectViewSet)
# Tasks app
router.register(r'tasks', TaskViewSet)
# Timer app
router.register(r'timer', PomodoroViewSet)


# Connectamos nuestra API utilizando el enrutamiento automático de URL.
# Además, incluimos URLs de acceso para la API navegable.
urlpatterns = [
    # Sitio admin
    path('admin/', admin.site.urls),
    # Root API
    path('api/', include(router.urls)),
    # Login API
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
]
