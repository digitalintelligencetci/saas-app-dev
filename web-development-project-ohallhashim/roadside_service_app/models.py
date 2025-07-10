from django.db import models
from django.contrib.auth.models import AbstractUser

# Contact model for storing contact form data
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"

# Custom User model extending AbstractUser
class User(AbstractUser):
    is_technician = models.BooleanField(default=False)

    def __str__(self):
        return self.username

