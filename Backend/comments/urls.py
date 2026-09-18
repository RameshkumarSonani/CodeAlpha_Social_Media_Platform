from django.urls import path

from .views import CommentListCreateView, CommentDeleteView

urlpatterns = [

    path(
        '',
        CommentListCreateView.as_view(),
        name='comment-list-create'
    ),

    path(
        '<int:pk>/',
        CommentDeleteView.as_view(),
        name='comment-delete'
    ),

]