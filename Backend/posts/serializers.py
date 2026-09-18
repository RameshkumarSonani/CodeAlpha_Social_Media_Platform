from rest_framework import serializers
from .models import Post
from .models import Post, Like


class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source='user.username',
        read_only=True
    )
    user_id = serializers.IntegerField(
    source='user.id',
    read_only=True
    )

    likes_count = serializers.SerializerMethodField()

    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id',
            'username',
            'user_id',
            'content',
            'created_at',
            'likes_count',
            'is_liked'
        ]

        read_only_fields = [
            'id',
            'username',
            'user_id',
            'created_at',
            'likes_count',
            'is_liked'
        ]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        request = self.context.get('request')

        if request and request.user.is_authenticated:
            return obj.likes.filter(
                user=request.user
            ).exists()

        return False

# Like Serilializer
class LikeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source='user.username',
        read_only=True
    )
    likes_count = serializers.IntegerField(
    source='likes.count',
    read_only=True
    )

    class Meta:
        model = Like
        fields = ['id', 'username', 'post', 'created_at' , 'likes_count']
        read_only_fields = ['id', 'username', 'post', 'created_at' , 'likes_count']