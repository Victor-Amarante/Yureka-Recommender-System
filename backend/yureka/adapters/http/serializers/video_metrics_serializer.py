from rest_framework import serializers
from yureka.domain.models.video_metrics import VideoMetric


class VideoMetricSerializer(serializers.ModelSerializer):
  class Meta:
    model = VideoMetric
    fields = '__all__'