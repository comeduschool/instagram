# drf modules
from rest_framework.permissions import SAFE_METHODS
from rest_framework.permissions import BasePermission

class IsFeedOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS + tuple(['POST']):
            return True
        else:
            return request.user == obj.user