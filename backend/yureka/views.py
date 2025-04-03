from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from datetime import datetime
from .models import User, Topic, UserTopic, UserRoutine, Video, Blacklist
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

    @action(detail=False, methods=['get'])
    def interesses(self, request):
        topics = Topic.objects.all()
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)

class UserRoutineViewSet(viewsets.ModelViewSet):
    queryset = UserRoutine.objects.all()
    serializer_class = UserRoutineSerializer

    @action(detail=False, methods=['post'])
    def cadastrar_rotina(self, request):
        serializer = UserRoutineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def devolver_rotina(self, request):
        user_id = request.query_params.get('user_id')
        routines = UserRoutine.objects.filter(user_id=user_id)
        serializer = UserRoutineSerializer(routines, many=True)
        return Response(serializer.data)

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    @action(detail=False, methods=['get'])
    def recomendar_videos(self, request):
        user_id = request.query_params.get('user_id')
        routines = UserRoutine.objects.filter(user_id=user_id)
        topics = routines.values_list('topic_id', flat=True)
        videos = Video.objects.filter(videotopic__topic_id__in=topics).order_by('-views')
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)

class BlacklistViewSet(viewsets.ModelViewSet):
    queryset = Blacklist.objects.all()
    serializer_class = BlacklistSerializer

@api_view(['GET'])
def status_check(request):
    try:
        User.objects.first()
        return Response({"status": True}, status=status.HTTP_200_OK)
    except:
        return Response({"status": False}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
