from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    message = models.CharField(max_length=500, blank=True)
    completed = models.BooleanField(default=False, blank=True, null=True)
    owner = models.ForeignKey(
        User, related_name="tasks", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
