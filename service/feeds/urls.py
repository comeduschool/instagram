# django modules
from django.urls import path

# viewsets
from .views import (
    FeedViewSet
)

feed_list = FeedViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

urlpatterns = [
    path('', feed_list),
]