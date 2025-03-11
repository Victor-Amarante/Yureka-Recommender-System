from django.db import models
import uuid
from yureka.domain.models.videos import Video


class CuratedVideo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    video = models.OneToOneField(Video, on_delete=models.CASCADE, related_name='curated_video')
    approved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.video.title