from django.db import models
import uuid
from yureka.domain.models.users import User
from yureka.domain.models.topics import Topic


class UserTopic(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='topics')
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='users')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} - {self.topic.name}"