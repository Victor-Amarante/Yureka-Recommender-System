from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, TopicViewSet, UserTopicViewSet, VideoViewSet, UserRoutineViewSet, BlacklistViewSet, status_check,
    InterestViewSet,
    RoutineViewSet,
    VideoRecommendationViewSet,
    VideoInteractionViewSet,
    ChannelViewSet
)

# Criando um roteador para as rotas da API
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'topics', TopicViewSet)
router.register(r'user-topics', UserTopicViewSet)
router.register(r'videos', VideoViewSet)
router.register(r'user-routines', UserRoutineViewSet)
router.register(r'blacklist', BlacklistViewSet)
router.register(r'interests', InterestViewSet, basename='interests')
router.register(r'routines', RoutineViewSet, basename='routines')
router.register(r'recommendations', VideoRecommendationViewSet, basename='recommendations')
router.register(r'video-interactions', VideoInteractionViewSet, basename='video-interactions')
router.register(r'channels', ChannelViewSet, basename='channels')

urlpatterns = [
    path('', include(router.urls)),
    path('status/', status_check, name='status-check'),
]
