from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from yureka import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Configuração do Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="Yureka API",
        default_version='v1',
        description="API para o sistema Yureka de recomendação de vídeos",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contato@yureka.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('accounts/', include('allauth.socialaccount.urls')),
    path('', include('yureka.urls')),

    # Endpoints da documentação
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    # Video endpoints
    path('videos/<str:video_id>/like/', views.handle_like),
    path('videos/<str:video_id>/comment/', views.handle_comment),
    path('channels/<str:channel_id>/follow/', views.handle_follow),
    path('channels/<str:channel_id>/', views.get_channel),
    path('videos/<str:video_id>/comments/', views.get_comments),
    path('videos/<str:video_id>/', views.get_video_details),
    
    # Recommendations endpoint
    path('recommendations/', views.get_user_recommendations),
    
    # User endpoints
    path('routines/', views.get_routine),
    path('routines/current/', views.get_current_routine),
    path('interests/', views.get_interests),
    path('interests/update/', views.update_interests),
    
    # Health check
    path('health/', views.health_check),

    # Authentication endpoints
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
