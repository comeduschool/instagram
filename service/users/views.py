# django modules
from django.contrib.auth import authenticate
from django.contrib.auth import login

# drf modules 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated

# models
from users.models import User

# serializers
from users.serializers import UserSerializer

class AuthViewSet(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [ AllowAny ]
    authentication_classes = []

    def signup(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        login(request, user)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    def signin(self, request):
        user = authenticate(email=request.data['email'], password=request.data['password'])
        if user is not None:
            login(request, user)
            serializer = self.get_serializer(user)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        else:
            try:
                user = User.objects.get(email=request.data['email'])
                message = "비밀번호를 확인하세요."
            except User.DoesNotExist:
                message = "사용자가 없습니다." 

            return Response(
                {
                    "message": message
                },
                status=status.HTTP_404_NOT_FOUND
            )
