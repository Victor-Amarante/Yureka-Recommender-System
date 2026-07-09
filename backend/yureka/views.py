from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User as AuthUser
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from rest_framework.exceptions import APIException
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from datetime import datetime

from .models import (
    User, Topic, UserTopic, UserRoutine, Video, Blacklist, Channel,
    CuratedVideo, UserLikes, VideoComment, UserFollowing, SocialAuth, AuthProviders
)
from .serializers import (
    UserSerializer, TopicSerializer, UserTopicSerializer, VideoSerializer,
    UserRoutineSerializer, BlacklistSerializer, CuratedVideoSerializer,
    VideoCommentSerializer, ChannelSerializer
)


def create_response(data=None, message=None, status_code=status.HTTP_200_OK):
    response = {
        "status": "success" if status_code < 400 else "error",
        "message": message,
        "data": data,
    }
    return Response(response, status=status_code)


def get_yureka_user(request):
    return User.objects.get(email=request.user.email)


class GlobalErrorHandler:
    @staticmethod
    def handle_exception(exc):
        if isinstance(exc, ObjectDoesNotExist):
            return create_response(message="Recurso não encontrado", status_code=status.HTTP_404_NOT_FOUND)
        elif isinstance(exc, APIException):
            return create_response(message=str(exc.detail), status_code=exc.status_code)
        else:
            return create_response(message="Erro interno do servidor", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ---------------------------------------------------------------------------
# Auth
# ---------------------------------------------------------------------------

@api_view(['POST'])
@permission_classes([AllowAny])
def google_auth(request):
    credential = request.data.get('credential')
    if not credential:
        return create_response(message="Credential obrigatório", status_code=status.HTTP_400_BAD_REQUEST)
    try:
        idinfo = id_token.verify_oauth2_token(
            credential, google_requests.Request(), settings.GOOGLE_CLIENT_ID
        )
    except Exception:
        return create_response(message="Token Google inválido", status_code=status.HTTP_401_UNAUTHORIZED)

    email = idinfo['email']
    name = idinfo.get('name', email.split('@')[0])
    avatar_url = idinfo.get('picture', '')

    auth_user, _ = AuthUser.objects.get_or_create(
        email=email, defaults={'username': email, 'first_name': name}
    )
    yureka_user, _ = User.objects.get_or_create(
        email=email, defaults={'name': name, 'avatar_url': avatar_url}
    )

    refresh = RefreshToken.for_user(auth_user)
    return create_response(
        data={
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UserSerializer(yureka_user).data,
        },
        message="Login realizado com sucesso"
    )


@api_view(['GET'])
def auth_me(request):
    if not request.user.is_authenticated:
        return Response({"detail": "Not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user = get_yureka_user(request)
        return create_response(data=UserSerializer(user).data)
    except User.DoesNotExist:
        return Response({"detail": "Not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def status_check(request):
    try:
        User.objects.first()
        return create_response(data={'database_status': True}, message="Banco de dados operacional")
    except Exception:
        return create_response(data={'database_status': False}, message="Erro ao conectar ao banco",
                               status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def health_check(request):
    return Response({"status": "healthy"}, status=status.HTTP_200_OK)


# ---------------------------------------------------------------------------
# CRUD ViewSets
# ---------------------------------------------------------------------------

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class UserTopicViewSet(viewsets.ModelViewSet):
    queryset = UserTopic.objects.all()
    serializer_class = UserTopicSerializer


class UserRoutineViewSet(viewsets.ModelViewSet):
    queryset = UserRoutine.objects.all()
    serializer_class = UserRoutineSerializer


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


class BlacklistViewSet(viewsets.ModelViewSet):
    queryset = Blacklist.objects.all()
    serializer_class = BlacklistSerializer


# ---------------------------------------------------------------------------
# Business ViewSets
# ---------------------------------------------------------------------------

class InterestViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def available_interests(self, request):
        try:
            topics = Topic.objects.all()
            return create_response(data=TopicSerializer(topics, many=True).data,
                                   message="Interesses disponíveis")
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)

    @action(detail=False, methods=['post'])
    def update_user_interests(self, request):
        try:
            topic_ids = request.data.get('topic_ids', [])
            user = get_yureka_user(request)
            UserTopic.objects.filter(user=user).delete()
            for topic_id in topic_ids:
                topic = Topic.objects.get(id=topic_id)
                UserTopic.objects.create(user=user, topic=topic)
            return create_response(message="Interesses atualizados com sucesso")
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)


class RoutineViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'])
    def register_routine(self, request):
        try:
            serializer = UserRoutineSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=get_yureka_user(request))
                return create_response(data=serializer.data, message="Rotina cadastrada",
                                       status_code=status.HTTP_201_CREATED)
            return create_response(message="Dados inválidos", data=serializer.errors,
                                   status_code=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)

    @action(detail=False, methods=['get'])
    def get_routines(self, request):
        try:
            routines = UserRoutine.objects.filter(user=get_yureka_user(request))
            return create_response(data=UserRoutineSerializer(routines, many=True).data,
                                   message="Rotinas recuperadas")
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)

    @action(detail=False, methods=['delete'])
    def clear_routines(self, request):
        try:
            UserRoutine.objects.filter(user=get_yureka_user(request)).delete()
            return create_response(message="Rotinas removidas")
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)


class VideoRecommendationViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def get_recommendations(self, request):
        try:
            current_time = timezone.localtime().time()
            requested_time = request.query_params.get('time')
            if requested_time:
                try:
                    current_time = datetime.strptime(requested_time, '%H:%M').time()
                except ValueError:
                    return create_response(message="Formato HH:MM esperado",
                                           status_code=status.HTTP_400_BAD_REQUEST)

            week_day = request.query_params.get('week_day') or timezone.localtime().strftime('%A').lower()

            routine = UserRoutine.objects.filter(
                user=get_yureka_user(request),
                start_time__lte=current_time,
                end_time__gte=current_time,
                week_day=week_day,
            ).first()

            if not routine:
                return create_response(message="Nenhuma rotina ativa para este horário", data=[])

            curated_videos = CuratedVideo.objects.filter(
                topics__topic=routine.topic
            ).select_related('video').order_by('-video__views')[:10]

            return create_response(data=CuratedVideoSerializer(curated_videos, many=True).data,
                                   message="Recomendações recuperadas")
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)


class VideoInteractionViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        try:
            video = Video.objects.get(id=pk)
            user = get_yureka_user(request)
            like, created = UserLikes.objects.get_or_create(user=user, video=video)
            if created:
                video.likes_count += 1
                video.save()
                return create_response(message="Vídeo curtido", data={"liked": True})
            else:
                like.delete()
                video.likes_count = max(0, video.likes_count - 1)
                video.save()
                return create_response(message="Curtida removida", data={"liked": False})
        except Video.DoesNotExist:
            return create_response(message="Vídeo não encontrado", status_code=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)

    @action(detail=True, methods=['post'])
    def comment(self, request, pk=None):
        try:
            video = Video.objects.get(id=pk)
            serializer = VideoCommentSerializer(data=request.data)
            if serializer.is_valid():
                comment = serializer.save(user=get_yureka_user(request), video=video)
                video.comments_count += 1
                video.save()
                return create_response(data=VideoCommentSerializer(comment).data,
                                       message="Comentário adicionado",
                                       status_code=status.HTTP_201_CREATED)
            return create_response(message="Dados inválidos", data=serializer.errors,
                                   status_code=status.HTTP_400_BAD_REQUEST)
        except Video.DoesNotExist:
            return create_response(message="Vídeo não encontrado", status_code=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        try:
            video = Video.objects.get(id=pk)
            comments = VideoComment.objects.filter(video=video)
            return create_response(data=VideoCommentSerializer(comments, many=True).data,
                                   message="Comentários recuperados")
        except Video.DoesNotExist:
            return create_response(message="Vídeo não encontrado", status_code=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)

    @action(detail=True, methods=['get'])
    def details(self, request, pk=None):
        try:
            video = Video.objects.get(id=pk)
            return create_response(data=VideoSerializer(video).data, message="Detalhes do vídeo")
        except Video.DoesNotExist:
            return create_response(message="Vídeo não encontrado", status_code=status.HTTP_404_NOT_FOUND)


class ChannelViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def follow(self, request, pk=None):
        try:
            channel = Channel.objects.get(id=pk)
            user = get_yureka_user(request)
            following, created = UserFollowing.objects.get_or_create(user=user, channel=channel)
            if not created:
                following.delete()
                return create_response(message="Deixou de seguir", data={"following": False})
            return create_response(message="Seguindo canal", data={"following": True})
        except Channel.DoesNotExist:
            return create_response(message="Canal não encontrado", status_code=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)

    @action(detail=True, methods=['get'])
    def details(self, request, pk=None):
        try:
            channel = Channel.objects.get(id=pk)
            return create_response(data=ChannelSerializer(channel).data)
        except Channel.DoesNotExist:
            return create_response(message="Canal não encontrado", status_code=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return GlobalErrorHandler.handle_exception(e)
