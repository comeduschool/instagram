# drf modules
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

# models
from feeds.models import Feed

# serializers
from feeds.serializers import FeedSerializer

# permissions
from feeds.permissions import IsFeedOwnerOrReadOnly

# Create your views here.
class FeedViewSet(ModelViewSet):
    queryset = Feed.objects.all()
    serializer_class = FeedSerializer
    permission_classes = [ IsFeedOwnerOrReadOnly ]

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )