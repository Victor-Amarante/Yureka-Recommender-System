from rest_framework import serializers
from yureka.domain.models.blacklist import Blacklist


class BlacklistSerializer(serializers.ModelSerializer):
  class Meta:
    model = Blacklist
    fields = '__all__'