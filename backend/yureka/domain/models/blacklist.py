from django.db import models
import uuid


class Blacklist(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    channel_id = models.CharField(max_length=255, unique=True)
    channel_name = models.CharField(max_length=255)
    reason = models.TextField(null=True, blank=True)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Blacklist - {self.channel_name}"