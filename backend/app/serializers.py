from rest_framework import serializers
from .models import User, Topic, Post, Comment

class TopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topic
        fields = ('pk', 'title', 'superTopic')

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('pk', 'user', 'topic', 'main_emotion', 'tldr', 'date', 'elaboration', 'sources', 'helpful', 'grounded')
      

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('pk', 'date', 'content', 'post', 'user')

class UserSerializer(serializers.ModelSerializer):

    class Meta:
      model = User
      fields = ('pk', 'email')