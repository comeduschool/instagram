# Django modules
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', True)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(email, password, **extra_fields)

# Create your models here.
class User(AbstractUser):
    TIMEOUT = 60 * 5
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    email = models.EmailField(max_length=256, unique=True)
    username = models.CharField(max_length=128, unique=True)
    password = models.CharField(max_length=128)
    profile = models.ImageField(default="", 
                                null=False, 
                                blank=True)
    description = models.CharField(max_length=512, blank=True)
    authcode = models.CharField(max_length=17, blank=True, default="")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = UserManager()

    class Meta:
        ordering = ['created']

    def __str__(self):
        """admin page에서 사용"""
        return f"({self.pk}) {self.email}"

    def __repr__(self):
        return f"<User {self.pk} {self.email} {self.username}>"

    