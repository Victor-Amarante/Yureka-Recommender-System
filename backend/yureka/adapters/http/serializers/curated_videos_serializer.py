from rest_framework import serializers
from yureka.domain.models.curated_videos import CuratedVideo


class CuratedVideoSerializer(serializers.ModelSerializer):
  class Meta:
    model = CuratedVideo
    fields = '__all__'