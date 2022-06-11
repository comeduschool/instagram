# python modules
from multiprocessing.sharedctypes import RawValue
import time
import hashlib

# Django modules
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError

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
    profile = models.ImageField(null=True)
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

    def _create_authcode(self):
        timestamp = int(time.time())
        while True:
            authcode = hashlib.sha224(f"{repr(self)}:{timestamp}".encode()).hexdigest()[:6]
            try: 
                User.objects.get(authcode__startswith=f"{authcode}:")
            except User.DoesNotExist:
                self.authcode = f"{authcode}:{timestamp}"
                break
        self.save()
        return authcode

    def create_authcode(self):
        if self.authcode != "":
            splited = self.authcode.split(":")
            if time.time() - int(splited[1]) < self.TIMEOUT:
                raise ValidationError("5분 이후에 인증코드를 생성할 수 있습니다.")

        authcode = self._create_authcode()
        return authcode

    def check_authcode(self, authcode):
        if self.authcode == "":
            raise ValueError("먼저 인증코드를 생성하세요.")
        
        splited = self.authcode.split(":")

        if time.time() - int(splited[1]) > self.TIMEOUT: 
            raise ValidationError("인증코드가 만료됐습니다. 인증코드를 새로 생성하세요.")
        else: 
            if splited[0] == authcode:
                return True
            else:
                return False

    def change_lostpassword(self, password):
        self.authcode = ""
        self.set_password(password)
        self.save()

    def change_password(self, password, new_password):
        if self.check_password(password):
            self.set_password(new_password)
            self.save()
        else:
            raise ValidationError("비밀번호 변경이 실패했습니다.")

    def upload_profile(self, file):
        if 'image' not in file.content_type:
            raise ValidationError("이미지 파일이 아닙니다. 이미지 파일을 업로드해주세요")
        ext = file.content_type.split("/")[-1]

        # MEDIA_ROOT/profiles/{pk}/profile-{timestamp}.ext
        self.profile.save(f"profiles/{self.pk}/profile-{int(time.time())}.{ext}", file.file)
        return self

    def delete_profile(self):
        self.profile = None
        self.save()
        return self