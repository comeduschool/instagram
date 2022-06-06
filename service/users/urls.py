# Django modules
from django.urls import path

# viewsets
from .views import (
    AuthViewSet,
)

signup = AuthViewSet.as_view({'post': 'signup'})
signin = AuthViewSet.as_view({'post': 'signin'})

urlpatterns = [
    # path("pk"),
    # path(),
    path('/signup', signup),
    path('/signin', signin),
]