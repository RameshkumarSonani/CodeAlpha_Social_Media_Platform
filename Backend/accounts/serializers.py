from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile , Follow


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        Profile.objects.create(user=user)

        return user


class ProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(
        source='user.id',
        read_only=True
    )

    username = serializers.CharField(
        source='user.username',
        read_only=True
    )

    email = serializers.EmailField(
        source='user.email',
        read_only=True
    )

    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    is_own_profile = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'user_id',
            'username',
            'email',
            'bio',
            'profile_image',
            'followers_count',
            'following_count',
            'is_following',
            'is_own_profile'
        ]

    def get_followers_count(self, obj):
        return obj.user.followers.count()

    def get_following_count(self, obj):
        return obj.user.following.count()

    def get_is_following(self, obj):
        request = self.context.get('request')

        if request and request.user.is_authenticated:
            return Follow.objects.filter(
                follower=request.user,
                following=obj.user
            ).exists()

        return False

    def get_is_own_profile(self, obj):
        request = self.context.get('request')

        if request and request.user.is_authenticated:
            return request.user == obj.user

        return False
#
class FollowSerializer(serializers.ModelSerializer):
    follower_username = serializers.CharField(
        source='follower.username',
        read_only=True
    )

    following_username = serializers.CharField(
        source='following.username',
        read_only=True
    )

    class Meta:
        model = Follow
        fields = [
            'id',
            'follower_username',
            'following_username',
            'created_at'
        ]

        read_only_fields = [
            'id',
            'follower_username',
            'following_username',
            'created_at'
        ]
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


