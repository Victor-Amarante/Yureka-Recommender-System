from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from datetime import datetime
from .models import User, Topic, UserTopic, UserRoutine, Video, Blacklist
from .serializers import (
    UserSerializer, TopicSerializer, UserTopicSerializer, VideoSerializer, UserRoutineSerializer, BlacklistSerializer
)
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

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
    def interests(self, request):
        topics = Topic.objects.all()
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)

class UserRoutineViewSet(viewsets.ModelViewSet):
    queryset = UserRoutine.objects.all()
    serializer_class = UserRoutineSerializer

    @action(detail=False, methods=['post'])
    def register_routine(self, request):
        serializer = UserRoutineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def get_routine(self, request):
        user_id = request.query_params.get('user_id')
        routines = UserRoutine.objects.filter(user_id=user_id)
        serializer = UserRoutineSerializer(routines, many=True)
        return Response(serializer.data)

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    @action(detail=False, methods=['get'])
    def recommend_videos(self, request):
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

# Video endpoints
@swagger_auto_schema(
    method='post',
    operation_description="Manipula o like de um vídeo",
    responses={200: "Like processado com sucesso", 401: "Não autorizado"}
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def handle_like(request, video_id):
    # Implementar lógica de like
    pass

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def handle_comment(request, video_id):
    # Implementar lógica de comentário
    pass

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def handle_follow(request, channel_id):
    # Implementar lógica de follow
    pass

@api_view(['GET'])
def get_channel(request, channel_id):
    # Implementar lógica para obter dados do canal
    pass

@api_view(['GET'])
def get_comments(request, video_id):
    # Implementar lógica para obter comentários
    pass

@api_view(['GET'])
def get_video_details(request, video_id):
    try:
        video = Video.objects.get(id=video_id)
        serializer = VideoSerializer(video)
        return Response(serializer.data)
    except Video.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

# Recommendations endpoints
@swagger_auto_schema(
    method='get',
    operation_description="Obtém as recomendações de vídeos para o usuário",
    responses={
        200: VideoSerializer(many=True),
        401: "Não autorizado"
    }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_recommendations(request):
    user = request.user
    current_time = timezone.localtime().time()
    
    # Buscar rotina atual do usuário
    routine = UserRoutine.objects.filter(
        user=user,
        start_time__lte=current_time,
        end_time__gte=current_time
    ).first()
    
    if routine:
        # Implementar lógica de recomendação baseada na rotina
        videos = Video.objects.filter(videotopic__topic=routine.topic)
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)
    
    return Response([])

# User endpoints
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_routine(request):
    routines = UserRoutine.objects.filter(user=request.user)
    serializer = UserRoutineSerializer(routines, many=True)
    return Response(serializer.data)

@swagger_auto_schema(
    method='get',
    operation_description="Obtém a rotina atual do usuário",
    responses={
        200: UserRoutineSerializer,
        401: "Não autorizado"
    }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_routine(request):
    current_time = timezone.localtime().time()
    routine = UserRoutine.objects.filter(
        user=request.user,
        start_time__lte=current_time,
        end_time__gte=current_time
    ).first()
    
    if routine:
        serializer = UserRoutineSerializer(routine)
        return Response(serializer.data)
    return Response(None)

@swagger_auto_schema(
    method='get',
    operation_description="Obtém os interesses do usuário",
    responses={
        200: TopicSerializer(many=True),
        401: "Não autorizado"
    }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_interests(request):
    user_topics = UserTopic.objects.filter(user=request.user)
    topics = [ut.topic for ut in user_topics]
    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data)

@swagger_auto_schema(
    method='post',
    operation_description="Atualiza os interesses do usuário",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'topic_ids': openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Schema(type=openapi.TYPE_STRING)
            )
        }
    ),
    responses={
        200: "Interesses atualizados com sucesso",
        401: "Não autorizado"
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_interests(request):
    topic_ids = request.data.get('topic_ids', [])
    
    # Limpar interesses anteriores
    UserTopic.objects.filter(user=request.user).delete()
    
    # Adicionar novos interesses
    for topic_id in topic_ids:
        try:
            topic = Topic.objects.get(id=topic_id)
            UserTopic.objects.create(user=request.user, topic=topic)
        except Topic.DoesNotExist:
            continue
    
    return Response(status=status.HTTP_200_OK)

# Health check endpoint
@api_view(['GET'])
def health_check(request):
    return Response({"status": "healthy"}, status=status.HTTP_200_OK)
