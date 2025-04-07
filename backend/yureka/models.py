import uuid
from django.db import models
from django.utils import timezone

class WeekDays(models.TextChoices):
    SUNDAY = 'sunday'
    MONDAY = 'monday'
    TUESDAY = 'tuesday'
    WEDNESDAY = 'wednesday'
    THURSDAY = 'thursday'
    FRIDAY = 'friday'
    SATURDAY = 'saturday'

class AuthProviders(models.TextChoices):
    GOOGLE = 'google'

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField()
    email = models.TextField(unique=True)
    avatar_url = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Topic(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField(unique=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class UserTopic(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'topic')

class Channel(models.Model):
    id = models.TextField(primary_key=True)
    name = models.TextField()
    about = models.TextField(null=True, blank=True)
    image_url = models.TextField(null=True, blank=True)
    subscribers = models.IntegerField(default=0)
    followers = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

class Video(models.Model):
    id = models.TextField(primary_key=True)
    title = models.TextField()
    thumbnail = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    duration = models.IntegerField()
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, null=True, blank=True)
    views = models.IntegerField(default=0)
    likes_count = models.IntegerField(default=0)
    comments_count = models.IntegerField(default=0)
    publication_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class CuratedVideo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    video = models.OneToOneField(Video, on_delete=models.CASCADE)
    approved_at = models.DateTimeField(null=True, blank=True)

class VideoTopic(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    video = models.ForeignKey(CuratedVideo, on_delete=models.CASCADE, related_name='topics')
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)

class UserRoutine(models.Model):
    WEEK_DAYS = [
        ('monday', 'Monday'),
        ('tuesday', 'Tuesday'),
        ('wednesday', 'Wednesday'),
        ('thursday', 'Thursday'),
        ('friday', 'Friday'),
        ('saturday', 'Saturday'),
        ('sunday', 'Sunday'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    start_time = models.TimeField()
    end_time = models.TimeField()
    week_day = models.CharField(max_length=10, choices=WEEK_DAYS, default='monday')
    created_at = models.DateTimeField(auto_now_add=True)

class UserFollowing(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'channel')

class UserWatched(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    completed = models.BooleanField(null=True, default=None)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'video')

class UserLikes(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'video')

class UserSaves(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'video')

class SocialAuth(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    provider = models.CharField(max_length=10, choices=AuthProviders.choices)

    class Meta:
        unique_together = ('user', 'provider')

class VideoMetrics(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(CuratedVideo, on_delete=models.CASCADE)
    watched_duration = models.IntegerField()
    watched_at = models.DateTimeField(null=True, blank=True)
    session_start = models.DateTimeField()
    session_end = models.DateTimeField()

class Blacklist(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    channel_id = models.TextField(unique=True)
    channel_name = models.TextField()
    reason = models.TextField(null=True, blank=True)
    added_at = models.DateTimeField(auto_now_add=True)

class VideoComment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
