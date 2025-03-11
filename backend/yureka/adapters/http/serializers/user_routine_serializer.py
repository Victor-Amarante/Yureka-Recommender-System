from rest_framework import serializers
from yureka.domain.models.user_routine import UserRoutine


class UserRoutineSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserRoutine
    fields = '__all__'