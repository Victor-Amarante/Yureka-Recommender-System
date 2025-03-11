from rest_framework import serializers
from yureka.domain.models.users import User


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'