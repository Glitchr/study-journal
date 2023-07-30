import json

from channels.db import database_sync_to_async
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import AnonymousUser
from asgiref.sync import async_to_sync
from rest_framework.authtoken.models import Token

class NotificationConsumer(WebsocketConsumer):
    @database_sync_to_async
    def get_user(self, token_key):
        try:
            token = Token.objects.get(key=token_key)
            return token.user
        except Token.DoesNotExist:
            return AnonymousUser()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data=None, close_code=None):
        data = json.loads(text_data)
        if data['command'] == 'subscribe':
            async_to_sync(self.channel_layer.group_add)(
                data['group'],
                self.channel_name
            )

    def send_notification(self, event):
        achievement = event['achievement']
        print('Sending notification:', achievement)
        self.send(text_data=json.dumps({
            'type': 'achievement_notification',
            'achievement': achievement
        }))

    def achievement_notification(self, event):
        achievement = event['achievement']
        print('Sending notification:', achievement)
        self.send(text_data=json.dumps({
            'type': 'achievement_notification',
            'achievement': achievement
        }))    
