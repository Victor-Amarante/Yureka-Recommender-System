from django.contrib import admin
from yureka.domain.models import (
  User, SocialAuth, Topic, UserTopic, Video, CuratedVideo, 
  VideoTopic, UserRoutine, VideoMetric, Blacklist
)


# Register your models here.
admin.site.register(User)
admin.site.register(SocialAuth)
admin.site.register(Topic)
admin.site.register(UserTopic)
admin.site.register(Video)
admin.site.register(CuratedVideo)
admin.site.register(VideoTopic)
admin.site.register(UserRoutine)
admin.site.register(VideoMetric)
admin.site.register(Blacklist)
