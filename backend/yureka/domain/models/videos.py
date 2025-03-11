from django.db import models
import uuid


class Video(models.Model):
    id = models.CharField(max_length=255, primary_key=True)  # YouTube video ID
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    duration = models.IntegerField()  # Em segundos
    channel_id = models.CharField(max_length=255)
    channel_name = models.CharField(max_length=255)
    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title