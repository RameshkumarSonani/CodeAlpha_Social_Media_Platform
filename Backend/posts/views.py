from rest_framework import generics, permissions
from .models import Post
from .serializers import PostSerializer , LikeSerializer
from rest_framework import generics, permissions
from .models import Post, Like


class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostDeleteView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        if instance.user == self.request.user:
            instance.delete()

class LikeCreateView(generics.CreateAPIView):
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        post = Post.objects.get(id=self.kwargs['pk'])

        if Like.objects.filter(
            user=self.request.user,
            post=post
        ).exists():
            from rest_framework.exceptions import ValidationError
            raise ValidationError("You already liked this post.")

        serializer.save(
            user=self.request.user,
            post=post
        )

class LikeDeleteView(generics.DestroyAPIView):
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return Like.objects.get(
            user=self.request.user,
            post_id=self.kwargs['pk']
        )