from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import (
    User, Topic, UserTopic, Video, CuratedVideo, VideoTopic,
    UserRoutine, VideoMetrics, Blacklist
)
from .serializers import (
    UserSerializer, TopicSerializer, UserTopicSerializer, VideoSerializer,
    CuratedVideoSerializer, VideoTopicSerializer, UserRoutineSerializer,
    VideoMetricsSerializer, BlacklistSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

class UserTopicViewSet(viewsets.ModelViewSet):
    queryset = UserTopic.objects.all()
    serializer_class = UserTopicSerializer

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

class CuratedVideoViewSet(viewsets.ModelViewSet):
    queryset = CuratedVideo.objects.all()
    serializer_class = CuratedVideoSerializer

class VideoTopicViewSet(viewsets.ModelViewSet):
    queryset = VideoTopic.objects.all()
    serializer_class = VideoTopicSerializer

class UserRoutineViewSet(viewsets.ModelViewSet):
    queryset = UserRoutine.objects.all()
    serializer_class = UserRoutineSerializer

class VideoMetricsViewSet(viewsets.ModelViewSet):
    queryset = VideoMetrics.objects.all()
    serializer_class = VideoMetricsSerializer

class BlacklistViewSet(viewsets.ModelViewSet):
    queryset = Blacklist.objects.all()
    serializer_class = BlacklistSerializer

# Endpoint para verificar status do banco de dados
from rest_framework.decorators import api_view
@api_view(['GET'])
def status_check(request):
    try:
        User.objects.first()
        return Response({"status": True}, status=status.HTTP_200_OK)
    except:
        return Response({"status": False}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

