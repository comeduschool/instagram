# drf modules
from rest_framework.permissions import BasePermission

class IsUserOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        print("hello")
        return request.user == obj