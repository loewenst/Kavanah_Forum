from rest_framework import serializers
from .models import User, Topic, Post, Comment



class UserSerializer(serializers.ModelSerializer):

    class Meta:
      model = User
      fields = ('pk', 'email')

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ('pk', 'user', 'topic', 'main_emotion', 'tldr', 'date', 'elaboration', 'sources', 'helpful', 'grounded')
      

class TopicSerializer(serializers.ModelSerializer):

    posts = PostSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        fields = ('pk', 'title', 'superTopic', 'posts')

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('pk', 'date', 'content', 'post', 'user')
