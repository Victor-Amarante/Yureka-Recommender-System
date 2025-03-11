from rest_framework import serializers
from yureka.domain.models.social_auth import SocialAuth


class SocialAuthSerializer(serializers.ModelSerializer):
  class Meta:
    model = SocialAuth
    fields = '__all__'