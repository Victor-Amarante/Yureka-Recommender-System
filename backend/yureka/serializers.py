from rest_framework import serializers
from .models import (
    User, SocialAuth, Topic, UserTopic, Video, CuratedVideo, VideoTopic,
    UserRoutine, VideoMetrics, Blacklist, Channel, UserFollowing, UserWatched,
    UserLikes, UserSaves, VideoComment
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'avatar_url', 'created_at']

class SocialAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialAuth
        fields = ['user', 'provider']

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'name', 'description', 'created_at']

class UserTopicSerializer(serializers.ModelSerializer):
    topic = TopicSerializer(read_only=True)
    
    class Meta:
        model = UserTopic
        fields = ['user', 'topic', 'created_at']

class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ['id', 'name', 'about', 'image_url', 'subscribers', 'followers', 'created_at']

class VideoSerializer(serializers.ModelSerializer):
    channel = ChannelSerializer(read_only=True)
    
    class Meta:
        model = Video
        fields = [
            'id', 'title', 'thumbnail', 'description', 'duration',
            'channel', 'views', 'likes_count', 'comments_count',
            'publication_date', 'created_at'
        ]

class CuratedVideoSerializer(serializers.ModelSerializer):
    video = VideoSerializer(read_only=True)
    
    class Meta:
        model = CuratedVideo
        fields = ['id', 'video', 'approved_at']

class VideoTopicSerializer(serializers.ModelSerializer):
    topic = TopicSerializer(read_only=True)
    video = CuratedVideoSerializer(read_only=True)
    
    class Meta:
        model = VideoTopic
        fields = ['id', 'video', 'topic']

class UserRoutineSerializer(serializers.ModelSerializer):
    topic = TopicSerializer(read_only=True)
    
    class Meta:
        model = UserRoutine
        fields = ['id', 'user', 'start_time', 'end_time', 'week_day', 'topic', 'created_at']

class UserFollowingSerializer(serializers.ModelSerializer):
    channel = ChannelSerializer(read_only=True)
    
    class Meta:
        model = UserFollowing
        fields = ['user', 'channel', 'created_at']

class UserWatchedSerializer(serializers.ModelSerializer):
    video = VideoSerializer(read_only=True)
    
    class Meta:
        model = UserWatched
        fields = ['user', 'video', 'completed', 'created_at']

class UserLikesSerializer(serializers.ModelSerializer):
    video = VideoSerializer(read_only=True)
    
    class Meta:
        model = UserLikes
        fields = ['user', 'video', 'created_at']

class UserSavesSerializer(serializers.ModelSerializer):
    video = VideoSerializer(read_only=True)
    
    class Meta:
        model = UserSaves
        fields = ['user', 'video', 'created_at']

class VideoMetricsSerializer(serializers.ModelSerializer):
    video = CuratedVideoSerializer(read_only=True)
    
    class Meta:
        model = VideoMetrics
        fields = [
            'id', 'user', 'video', 'watched_duration',
            'watched_at', 'session_start', 'session_end'
        ]

class BlacklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blacklist
        fields = ['id', 'channel_id', 'channel_name', 'reason', 'added_at']

class UserInterestsSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = ['topics']

class VideoCommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = VideoComment
        fields = ['id', 'user', 'video', 'content', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']
