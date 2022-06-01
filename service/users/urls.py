# Django modules
from django.urls import path

# viewsets
from .views import (
    AuthViewSet,
)

signup = AuthViewSet.as_view({'post': 'signup'})

urlpatterns = [
    # path("pk"),
    # path(),
    path('/signup', signup),
]