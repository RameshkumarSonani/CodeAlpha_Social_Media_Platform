from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Follow, Profile
from .serializers import (
    RegisterSerializer,
    ProfileSerializer,
    FollowSerializer,
    UserSerializer
)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk=None):
        if pk:
            user = get_object_or_404(User, id=pk)
            profile = get_object_or_404(Profile, user=user)
        else:
            profile = get_object_or_404(
                Profile,
                user=request.user
            )

        serializer = ProfileSerializer(
            profile,
            context={'request': request}
        )

        return Response(serializer.data)


class FollowCreateView(generics.CreateAPIView):
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        following_user = User.objects.get(
            id=self.kwargs['pk']
        )

        if following_user == self.request.user:
            raise ValidationError(
                "You cannot follow yourself."
            )

        if Follow.objects.filter(
            follower=self.request.user,
            following=following_user
        ).exists():
            raise ValidationError(
                "You already follow this user."
            )

        serializer.save(
            follower=self.request.user,
            following=following_user
        )


class FollowDeleteView(generics.DestroyAPIView):
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return Follow.objects.get(
            follower=self.request.user,
            following_id=self.kwargs['pk']
        )


class FollowersListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = User.objects.get(id=self.kwargs['pk'])

        return User.objects.filter(
            following__following=user
        )


class FollowingListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = User.objects.get(id=self.kwargs['pk'])

        return User.objects.filter(
            followers__follower=user
        )