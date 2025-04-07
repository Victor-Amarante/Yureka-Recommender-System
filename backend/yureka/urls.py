from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, TopicViewSet, UserTopicViewSet, VideoViewSet, UserRoutineViewSet, BlacklistViewSet, status_check,
    InterestViewSet,
    RoutineViewSet,
    VideoRecommendationViewSet
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

urlpatterns = [
    path('', include(router.urls)),
    path('status/', status_check, name='status-check'),
]
