from django.urls import path
from .views import (
    RegisterView,
    ProfileView,
    FollowCreateView,
    FollowDeleteView,
    FollowersListView,
    FollowingListView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profile/<int:pk>/', ProfileView.as_view(), name='user-profile'),
        path(
        '<int:pk>/follow/',
        FollowCreateView.as_view(),
        name='follow'
    ),

    path(
        '<int:pk>/follow/delete/',
        FollowDeleteView.as_view(),
        name='unfollow'
    ),
    path(
    '<int:pk>/followers/',
    FollowersListView.as_view(),
    name='followers'
    ),

    path(
    '<int:pk>/following/',
    FollowingListView.as_view(),
    name='following'
    ),
]