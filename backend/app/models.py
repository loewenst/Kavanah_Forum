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
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    main_emotion = models.CharField(max_length=100, blank=True)
    tldr = models.CharField(max_length=500)
    date = models.DateTimeField(auto_now_add=True)
    elaboration = models.CharField(max_length=100000, blank=True)
    sources = models.CharField(max_length=2000, null=True, blank=True)
    helpful = models.IntegerField(null=True)
    grounded = models.IntegerField(null=True)
    
    def __str__(self):
      return self.tldr

class Comment(models.Model):
    date = models.DateField(auto_now_add=True)
    content = models.CharField('comment', max_length=500)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)