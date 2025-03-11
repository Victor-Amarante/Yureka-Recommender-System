from rest_framework import serializers
from yureka.domain.models.topics import Topic


class TopicSerializer(serializers.ModelSerializer):
  class Meta:
    model = Topic
    fields = '__all__'