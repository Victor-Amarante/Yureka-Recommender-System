from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, TopicViewSet, UserTopicViewSet, VideoViewSet, UserRoutineViewSet, BlacklistViewSet, status_check)

# Criando um roteador para as rotas da API
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'topics', TopicViewSet)
router.register(r'user-topics', UserTopicViewSet)
router.register(r'videos', VideoViewSet)
# router.register(r'curated-videos', CuratedVideoViewSet)
# router.register(r'video-topics', VideoTopicViewSet)
router.register(r'user-routines', UserRoutineViewSet)
# router.register(r'video-metrics', VideoMetricsViewSet)
router.register(r'blacklist', BlacklistViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/status/', status_check, name='status_check'),
]
