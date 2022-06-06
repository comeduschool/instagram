# Django modules
from django.urls import path

# viewsets
from .views import (
    AuthViewSet,
)

signup = AuthViewSet.as_view({'post': 'signup'})
signin = AuthViewSet.as_view({'post': 'signin'})

authcode = AuthViewSet.as_view({
    'post': 'create_authcode',
    'put': 'check_authcode'
})

password = AuthViewSet.as_view({'put': 'change_lostpassword'})

urlpatterns = [
    # path("pk"),
    # path(),
    path('/signup', signup),
    path('/signin', signin),
    path('/authcode', authcode),
    path('/password', password),
]