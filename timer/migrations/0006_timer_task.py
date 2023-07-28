# Generated by Django 4.2.1 on 2023-07-28 01:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0003_remove_task_timer'),
        ('timer', '0005_delete_pomodoro_timer_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='timer',
            name='task',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='task', to='tasks.task'),
        ),
    ]