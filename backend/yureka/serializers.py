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
        fields = ['id', 'name', 'description']

class UserTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTopic
        fields = '__all__'

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'duration', 'channel_id', 
                 'channel_name', 'views', 'created_at']

class CuratedVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuratedVideo
        fields = '__all__'

class VideoTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoTopic
        fields = '__all__'

class UserRoutineSerializer(serializers.ModelSerializer):
    topic = TopicSerializer(read_only=True)
    
    class Meta:
        model = UserRoutine
        fields = ['id', 'start_time', 'end_time', 'topic']

class VideoMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoMetrics
        fields = '__all__'

class BlacklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blacklist
        fields = '__all__'

class UserInterestsSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['topics']
