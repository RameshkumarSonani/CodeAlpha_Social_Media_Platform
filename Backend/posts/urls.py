from django.urls import path
from .views import PostListCreateView, PostDeleteView , LikeCreateView , LikeDeleteView

urlpatterns = [
    path('', PostListCreateView.as_view(), name='post-list-create'),
    path('<int:pk>/', PostDeleteView.as_view(), name='post-delete'),
    path('<int:pk>/like/', LikeCreateView.as_view(), name='like-create'),
    path('<int:pk>/like/delete/',LikeDeleteView.as_view(),name='like-delete'),
]