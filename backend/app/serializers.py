from rest_framework import serializers
from .models import User, Topic, Post, Comment, Question



class UserSerializer(serializers.ModelSerializer):

    class Meta:
      model = User
      fields = ('pk', 'email')


      

class TopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topic
        fields = "__all__"
        depth = 2

class PostSerializer(serializers.ModelSerializer):
    # user_id = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = "__all__"
        depth = 2
        # fields = ('pk', 'user_id', 'topic_id', 'main_emotion', 'tldr', 'date', 'elaboration', 'sources', 'helpful', 'grounded')

class CreatePostSerializer(serializers.ModelSerializer):
    user = UserSerializer
    topic = TopicSerializer
    
    class Meta:
        model = Post
        fields = ('user', 'topic', 'main_emotion', 'tldr', 'elaboration', 'sources')

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = "__all__"
        depth = 2

class CreateQuestionSerializer(serializers.ModelSerializer):
    user = UserSerializer
    topic = TopicSerializer

    class Meta:
        model = Question
        fields = ('user', 'topic', 'question_text', 'long_question_text')