from rest_framework import serializers
from yureka.domain.models.video_topics import VideoTopic


class VideoTopicSerializer(serializers.ModelSerializer):
  class Meta:
    model = VideoTopic
    fields = '__all__'