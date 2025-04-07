from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from datetime import datetime
from .models import User, Topic, UserTopic, UserRoutine, Video, Blacklist, VideoTopic, CuratedVideo, UserLikes, VideoComment
from .serializers import (UserSerializer, TopicSerializer, UserTopicSerializer, VideoSerializer, UserRoutineSerializer, BlacklistSerializer, CuratedVideoSerializer, VideoCommentSerializer)
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import APIException


def create_response(data=None, message=None, status_code=status.HTTP_200_OK):
    """
    Creates a standardized response format for API responses.
    """
    response = {
        "status": "success" if status_code < 400 else "error",
        "message": message,
        "data": data
    }
    return Response(response, status=status_code)


class GlobalErrorHandler:
    """
    Handles exceptions and returns standardized error responses.
    """
    @staticmethod
    def handle_exception(exc):
        if isinstance(exc, ObjectDoesNotExist):
            return create_response(
                message="Recurso não encontrado",
                status_code=status.HTTP_404_NOT_FOUND
            )
        elif isinstance(exc, APIException):
            return create_response(
                message=str(exc.detail),
                status_code=exc.status_code
            )
        else:
            return create_response(
                message="Erro interno do servidor",
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar usuários.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TopicViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar tópicos.
    """
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

class UserTopicViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar interesses dos usuários.
    """
    queryset = UserTopic.objects.all()
    serializer_class = UserTopicSerializer

    @action(detail=False, methods=['get'])
    def interests(self, request):
        topics = Topic.objects.all()
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)

class UserRoutineViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar rotinas dos usuários.
    """
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
    """
    ViewSet para gerenciar vídeos.
    """
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
    """
    ViewSet para gerenciar blacklist de canais.
    """
    queryset = Blacklist.objects.all()
    serializer_class = BlacklistSerializer

class InterestViewSet(viewsets.ViewSet):
    """
    ViewSet para gerenciar interesses dos usuários.
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Retorna todos os interesses disponíveis",
        responses={200: TopicSerializer(many=True)}
    )
    @action(detail=False, methods=['get'])
    def available_interests(self, request):
        try:
            topics = Topic.objects.all()
            serializer = TopicSerializer(topics, many=True)
            return create_response(
                data=serializer.data,
                message="Interesses disponíveis recuperados com sucesso"
            )
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)

    @swagger_auto_schema(
        operation_description="Atualiza os interesses do usuário",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'topic_ids': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(type=openapi.TYPE_STRING)
                )
            }
        )
    )
    @action(detail=False, methods=['post'])
    def update_user_interests(self, request):
        try:
            topic_ids = request.data.get('topic_ids', [])
            
            # Limpar interesses anteriores
            UserTopic.objects.filter(user=request.user).delete()
            
            # Adicionar novos interesses
            for topic_id in topic_ids:
                topic = Topic.objects.get(id=topic_id)
                UserTopic.objects.create(user=request.user, topic=topic)
            
            return create_response(
                message="Interesses atualizados com sucesso"
            )
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)

class RoutineViewSet(viewsets.ViewSet):
    """
    ViewSet para gerenciar rotinas dos usuários.
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Cadastra uma nova rotina",
        request_body=UserRoutineSerializer
    )
    @action(detail=False, methods=['post'])
    def register_routine(self, request):
        try:
            serializer = UserRoutineSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return create_response(
                    data=serializer.data,
                    message="Rotina cadastrada com sucesso",
                    status_code=status.HTTP_201_CREATED
                )
            return create_response(
                message="Dados inválidos",
                data=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)

    @swagger_auto_schema(
        operation_description="Retorna as rotinas do usuário",
        responses={200: UserRoutineSerializer(many=True)}
    )
    @action(detail=False, methods=['get'])
    def get_routines(self, request):
        try:
            routines = UserRoutine.objects.filter(user=request.user)
            serializer = UserRoutineSerializer(routines, many=True)
            return create_response(
                data=serializer.data,
                message="Rotinas recuperadas com sucesso"
            )
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)

class VideoRecommendationViewSet(viewsets.ViewSet):
    """
    ViewSet para gerenciar recomendações de vídeos.
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Retorna vídeos recomendados para o horário atual",
        manual_parameters=[
            openapi.Parameter(
                'time',
                openapi.IN_QUERY,
                description="Horário para recomendação (formato HH:MM)",
                type=openapi.TYPE_STRING,
                required=False
            ),
            openapi.Parameter(
                'week_day',
                openapi.IN_QUERY,
                description="Dia da semana",
                type=openapi.TYPE_STRING,
                required=False
            )
        ],
        responses={200: CuratedVideoSerializer(many=True)}
    )
    @action(detail=False, methods=['get'])
    def get_recommendations(self, request):
        try:
            current_time = timezone.localtime().time()
            requested_time = request.query_params.get('time')
            if requested_time:
                try:
                    current_time = datetime.strptime(requested_time, '%H:%M').time()
                except ValueError:
                    return create_response(
                        message="Formato de horário inválido. Use HH:MM",
                        status_code=status.HTTP_400_BAD_REQUEST
                    )

            week_day = request.query_params.get('week_day') or timezone.localtime().strftime('%A').lower()

            routine = UserRoutine.objects.filter(
                user=request.user,
                start_time__lte=current_time,
                end_time__gte=current_time,
                week_day=week_day
            ).first()

            if not routine:
                return create_response(
                    message="Nenhuma rotina encontrada para este horário",
                    data=[]
                )

            curated_videos = CuratedVideo.objects.filter(
                video__videotopic__topic=routine.topic
            ).select_related('video').order_by('-video__views')[:10]

            serializer = CuratedVideoSerializer(curated_videos, many=True)
            return create_response(
                data=serializer.data,
                message="Recomendações recuperadas com sucesso"
            )
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)

class VideoInteractionViewSet(viewsets.ViewSet):
    """
    ViewSet para gerenciar interações com vídeos (likes, comentários, etc).
    """
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        try:
            video = Video.objects.get(id=pk)
            like, created = UserLikes.objects.get_or_create(user=request.user, video=video)
            
            if created:
                video.likes_count += 1
                video.save()
                return create_response(
                    message="Vídeo curtido com sucesso",
                    data={"liked": True}
                )
            else:
                like.delete()
                video.likes_count -= 1
                video.save()
                return create_response(
                    message="Curtida removida com sucesso",
                    data={"liked": False}
                )
        except Video.DoesNotExist:
            return create_response(
                message="Vídeo não encontrado",
                status_code=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)

    @action(detail=True, methods=['post'])
    def comment(self, request, pk=None):
        try:
            video = Video.objects.get(id=pk)
            serializer = VideoCommentSerializer(data=request.data)
            
            if serializer.is_valid():
                comment = serializer.save(user=request.user, video=video)
                video.comments_count += 1
                video.save()
                
                return create_response(
                    data=VideoCommentSerializer(comment).data,
                    message="Comentário adicionado com sucesso",
                    status_code=status.HTTP_201_CREATED
                )
            return create_response(
                message="Dados inválidos",
                data=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST
            )
        except Video.DoesNotExist:
            return create_response(
                message="Vídeo não encontrado",
                status_code=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        try:
            video = Video.objects.get(id=pk)
            comments = VideoComment.objects.filter(video=video)
            serializer = VideoCommentSerializer(comments, many=True)
            
            return create_response(
                data=serializer.data,
                message="Comentários recuperados com sucesso"
            )
        except Video.DoesNotExist:
            return create_response(
                message="Vídeo não encontrado",
                status_code=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)

    @action(detail=True, methods=['get'])
    def details(self, request, pk=None):
        try:
            video = Video.objects.get(id=pk)
            serializer = VideoSerializer(video)
            return create_response(
                data=serializer.data,
                message="Detalhes do vídeo recuperados com sucesso"
            )
        except Video.DoesNotExist:
            return create_response(
                message="Vídeo não encontrado",
                status_code=status.HTTP_404_NOT_FOUND
            )

class ChannelViewSet(viewsets.ViewSet):
    """
    ViewSet para gerenciar interações com canais.
    """
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def follow(self, request, pk=None):
        # Implementar lógica de follow
        pass

    @action(detail=True, methods=['get'])
    def details(self, request, pk=None):
        # Implementar lógica para obter dados do canal
        pass

@swagger_auto_schema(
    method='get',
    operation_description="Verifica o status do banco de dados",
    responses={
        200: openapi.Response(
            description="Status do banco de dados",
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'status': openapi.Schema(type=openapi.TYPE_STRING),
                    'message': openapi.Schema(type=openapi.TYPE_STRING),
                    'data': openapi.Schema(type=openapi.TYPE_OBJECT, properties={
                        'database_status': openapi.Schema(type=openapi.TYPE_BOOLEAN)
                    })
                }
            )
        )
    }
)
    
@api_view(['GET'])
def status_check(request):
    try:
        # Tenta fazer uma consulta simples no banco
        User.objects.first()
        return create_response(
            data={'database_status': True},
            message="Banco de dados operacional"
        )
    except Exception as e:
        return create_response(
            data={'database_status': False},
            message="Erro ao conectar ao banco de dados",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

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
