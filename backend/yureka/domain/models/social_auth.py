from django.db import models
import uuid
from yureka.domain.models.users import User


class SocialAuth(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='social_auth')
    provider = models.CharField(max_length=255)  # Google, Facebook, etc.
    provider_id = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f"{self.provider} - {self.user.name}"