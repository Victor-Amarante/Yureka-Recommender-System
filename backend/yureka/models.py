import uuid
from django.db import models
from django.utils import timezone

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    avatar_url = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class SocialAuth(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    provider = models.CharField(max_length=50)
    provider_id = models.CharField(max_length=255, unique=True)

class Topic(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class UserTopic(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Video(models.Model):
    id = models.CharField(primary_key=True, max_length=255)  # YouTube video ID
    title = models.CharField(max_length=500)
    description = models.TextField(null=True, blank=True)
    duration = models.IntegerField()  # Duration in seconds
    channel_id = models.CharField(max_length=255)
    channel_name = models.CharField(max_length=255)
    views = models.IntegerField(default=0)
    created_at = models.DateTimeField()

class CuratedVideo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    video = models.OneToOneField(Video, on_delete=models.CASCADE)
    approved_at = models.DateTimeField(null=True, default=timezone.now)

class VideoTopic(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    video = models.ForeignKey(CuratedVideo, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)

class UserRoutine(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.TimeField()
    end_time = models.TimeField()
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class VideoMetrics(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(CuratedVideo, on_delete=models.CASCADE)
    watched_duration = models.IntegerField()
    watched_at = models.DateTimeField(auto_now_add=True)
    session_start = models.DateTimeField()
    session_end = models.DateTimeField()

class Blacklist(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    channel_id = models.CharField(max_length=255, unique=True)
    channel_name = models.CharField(max_length=255)
    reason = models.TextField(null=True, blank=True)
    added_at = models.DateTimeField(auto_now_add=True)
