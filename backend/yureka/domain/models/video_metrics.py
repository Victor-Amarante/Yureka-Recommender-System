from django.db import models
import uuid
from yureka.domain.models.users import User
from yureka.domain.models.curated_videos import CuratedVideo


class VideoMetric(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='video_metrics')
    video = models.ForeignKey(CuratedVideo, on_delete=models.CASCADE, related_name='metrics')
    watched_duration = models.IntegerField()
    watched_at = models.DateTimeField(null=True, blank=True)
    session_start = models.DateTimeField()
    session_end = models.DateTimeField()

    def __str__(self):
        return f"{self.user.name} - {self.video.title} ({self.watched_duration}s)"
