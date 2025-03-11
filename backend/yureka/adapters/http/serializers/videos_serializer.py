from rest_framework import serializers
from yureka.domain.models.videos import Video


class VideoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Video
    fields = '__all__'