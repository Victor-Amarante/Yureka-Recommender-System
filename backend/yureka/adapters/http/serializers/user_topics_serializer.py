from rest_framework import serializers
from yureka.domain.models.user_topics import UserTopic


class UserTopicSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserTopic
    fields = '__all__'