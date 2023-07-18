from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions

from .models import Topic, Post, Comment
from .serializers import *

# Create your views here.

@api_view(['GET'])
def user_info(request):
    data = request.user
    serializer = UserSerializer(data, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([permissions.IsAuthenticated])
def topics(request):
    if request.method == 'GET':
        data = Topic.objects.all()

        serializer = TopicSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([permissions.IsAuthenticated])
def subtopics(request):
    if request.method == 'GET':
        superTopic = request.GET.get('supertopic')
        data = Topic.objects.filter(superTopic=superTopic)

        serializer = TopicSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

@api_view(['GET'])
def topic_detail(request, pk):
  try:
    data = Topic.objects.get(pk=pk)
  except Topic.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  if request.method == 'GET':
      serializer = TopicSerializer(data, context={'request': request})

      return Response(serializer.data)

@api_view(['GET'])
def posts(request):
    if request.method == 'GET':
        data = Post.objects.all()

        serializer = PostSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

@api_view(['POST'])
# @permission_classes([permissions.IsAuthenticated])
def createpost(request):
    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'PUT', 'DELETE'])
def post_detail(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
      data = Post.objects.get(pk=pk)
      serializer = PostSerializer(data, context={'request': request})

      return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PostSerializer(post, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def comments(request):
    if request.method == 'GET':
        data = Comment.objects.all()

        serializer = CommentSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def comment_detail(request, pk):
    try:
        comment = Comment.objects.get(pk=pk)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def users(request):
    if request.method == 'GET':
        data = User.objects.all()

        serializer = UserSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)