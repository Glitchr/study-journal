# Generated by Django 4.2.1 on 2023-07-28 00:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timer', '0002_pomodoro_total_time'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='pomodoro',
            options={'ordering': ['created']},
        ),
        migrations.AddField(
            model_name='pomodoro',
            name='created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]