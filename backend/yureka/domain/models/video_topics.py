from django.db import models
import uuid
from yureka.domain.models.curated_videos import CuratedVideo
from yureka.domain.models.topics import Topic


class VideoTopic(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    video = models.ForeignKey(CuratedVideo, on_delete=models.CASCADE, related_name='topics')
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='videos')

    def __str__(self):
        return f"{self.video.title} - {self.topic.name}"