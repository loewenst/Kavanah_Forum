from rest_framework import serializers
from .models import User, Topic, Post, Comment



class UserSerializer(serializers.ModelSerializer):

    class Meta:
      model = User
      fields = ('pk', 'email')


      

class TopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topic
        fields = ('pk', 'title', 'superTopic', 'posts')
        depth = 2

class PostSerializer(serializers.ModelSerializer):
    # user_id = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = "__all__"
        # fields = ('pk', 'user_id', 'topic_id', 'main_emotion', 'tldr', 'date', 'elaboration', 'sources', 'helpful', 'grounded')

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('pk', 'date', 'content', 'post', 'user')
