from django.contrib import admin
from .models import (
    User, 
    SocialAuth, 
    Topic, 
    UserTopic, 
    Video, 
    CuratedVideo,
    VideoTopic, 
    UserRoutine, 
    VideoMetrics, 
    Blacklist
)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    search_fields = ('name', 'email')

@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'channel_name', 'views', 'created_at')
    search_fields = ('title', 'channel_name')

@admin.register(CuratedVideo)
class CuratedVideoAdmin(admin.ModelAdmin):
    list_display = ('video', 'approved_at')

@admin.register(UserRoutine)
class UserRoutineAdmin(admin.ModelAdmin):
    list_display = ('user', 'topic', 'start_time', 'end_time')

@admin.register(VideoMetrics)
class VideoMetricsAdmin(admin.ModelAdmin):
    list_display = ('user', 'video', 'watched_duration', 'watched_at')

@admin.register(Blacklist)
class BlacklistAdmin(admin.ModelAdmin):
    list_display = ('channel_name', 'reason', 'added_at')
    search_fields = ('channel_name',)

# Registrando os modelos mais simples
admin.site.register(SocialAuth)
admin.site.register(UserTopic)
admin.site.register(VideoTopic)
