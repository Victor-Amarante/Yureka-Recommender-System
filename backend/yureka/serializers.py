from rest_framework import serializers
from .models import (
    User, SocialAuth, Topic, UserTopic, Video, CuratedVideo, VideoTopic,
    UserRoutine, VideoMetrics, Blacklist
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class SocialAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialAuth
        fields = '__all__'

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'

class UserTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTopic
        fields = '__all__'

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

class CuratedVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuratedVideo
        fields = '__all__'

class VideoTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoTopic
        fields = '__all__'

class UserRoutineSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRoutine
        fields = '__all__'

class VideoMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoMetrics
        fields = '__all__'

class BlacklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blacklist
        fields = '__all__'
