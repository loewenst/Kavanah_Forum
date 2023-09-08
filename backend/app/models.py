from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from datetime import datetime

# Create your models here.

class Topic(models.Model):
    title = models.CharField(max_length=200)
    superTopic = models.CharField(max_length=200)

    def __str__(self):
      return self.title


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, related_name="posts", on_delete=models.CASCADE)
    main_emotion = models.CharField(max_length=100, blank=True, null=True)
    second_emotion = models.CharField(max_length=100, blank=True, null=True)
    third_emotion = models.CharField(max_length=100, blank=True, null=True)
    tldr = models.CharField(max_length=500)
    date = models.DateTimeField(auto_now_add=True)
    elaboration = models.CharField(max_length=100000, blank=True, null=True)
    sources = models.CharField(max_length=2000, null=True, blank=True)
    
    def __str__(self):
      return self.tldr

class Helpful(models.Model):
    post = models.ForeignKey(Post, related_name='helpfuls', on_delete=models.CASCADE)
    users = models.ManyToManyField(User)

class Grounded(models.Model):
    post = models.ForeignKey(Post, related_name='groundeds', on_delete=models.CASCADE)
    users = models.ManyToManyField(User)


class Comment(models.Model):
    date = models.DateField(auto_now_add=True)
    content = models.CharField('comment', max_length=500)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Question(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, related_name="questions", on_delete=models.CASCADE)
    question_text = models.CharField(max_length=500, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)
    long_question_text = models.CharField(max_length=100000, blank=True, null=True)
    
    def __str__(self):
      return self.question_text

class Reply(models.Model):
    date = models.DateField(auto_now_add=True)
    content = models.CharField('reply', max_length=500)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
