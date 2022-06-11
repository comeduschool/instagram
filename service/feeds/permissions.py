# drf modules
from rest_framework.permissions import SAFE_METHODS
from rest_framework.permissions import BasePermission

class IsFeedOwnerOrReadOnly(BasePermission):
    def has_permission(self, request):
        if request.method in SAFE_METHODS:
            return True

    def has_object_permission(self, request, view, obj):
        return request.user == obj.user