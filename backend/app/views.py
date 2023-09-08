from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import status, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Topic, Post, Comment, Question
from .serializers import *

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_info(request):
    data = request.user
    serializer = UserSerializer(data, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([])
def topics(request):
    if request.method == 'GET':
        data = Topic.objects.all()

        serializer = TopicSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([])
def subtopics(request):
    if request.method == 'GET':
        superTopic = request.GET.get('supertopic')
        data = Topic.objects.filter(superTopic=superTopic)

        serializer = TopicSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([])
def topic_detail(request, pk):
  try:
    data = Topic.objects.get(pk=pk)
  except Topic.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  if request.method == 'GET':
      serializer = TopicSerializer(data, context={'request': request})

      return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([])
def posts(request):
    if request.method == 'GET':
        data = Post.objects.all()

        serializer = PostSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([])
def latestposts(request):
    if request.method == 'GET':
        data = Post.objects.all().order_by("-date")[:3]

        serializer = PostSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([])
def questions(request):
    if request.method == 'GET':
        data = Question.objects.all()

        serializer = QuestionSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([])
def latestquestions(request):
    if request.method == 'GET':
        data = Question.objects.all().order_by("-date")[:3]

        serializer = QuestionSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def createpost(request):
    if request.method == 'POST':
        serializer = CreatePostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def createquestion(request):
    if request.method == 'POST':
        serializer = CreateQuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([])
def post_detail(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
      data = Post.objects.get(pk=pk)
      serializer = PostSerializer(data, context={'request': request})

      return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([])
def question_detail(request, pk):
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
      data = Question.objects.get(pk=pk)
      serializer = QuestionSerializer(data, context={'request': request})

      return Response(serializer.data)

@api_view(['PUT', 'DELETE'])
@permission_classes([permissions.IsAuthenticated])
def post_modify(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = CreatePostSerializer(post, data=request.data,context={'request': request})
        if serializer.is_valid():
            if serializer.validated_data['user'] != request.user:
                raise PermissionDenied
            else:
                serializer.save()
                return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if post.user != request.user:
            raise PermissionDenied
        else:
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT', 'DELETE'])
@permission_classes([permissions.IsAuthenticated])
def question_modify(request, pk):
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = CreateQuestionSerializer(question, data=request.data,context={'request': request})
        if serializer.is_valid():
            if serializer.validated_data['user'] != request.user:
                raise PermissionDenied
            else:
                serializer.save()
                return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if question.user != request.user:
            raise PermissionDenied
        else:
            question.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@authentication_classes([])
def comments(request):
    if request.method == 'GET':
        post = request.GET.get('post')
        data = Comment.objects.filter(post=post)

        serializer = CommentSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def postcomment(request):
    if request.method == 'POST':
        serializer = CreateCommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
@permission_classes([permissions.IsAuthenticated])
def comment_modify(request, pk):
    try:
        comment = Comment.objects.get(pk=pk)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = CreateCommentSerializer(comment, data=request.data, context={'request': request})
        if serializer.is_valid():
            if serializer.validated_data['user'] != request.user:
                raise PermissionDenied
            else:
                serializer.save()
                return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@authentication_classes([])
def replies(request):
    if request.method == 'GET':
        question = request.GET.get('question')
        data = Reply.objects.filter(question=question)

        serializer = ReplySerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def postreply(request):
    if request.method == 'POST':
        serializer = CreateReplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
@permission_classes([permissions.IsAuthenticated])
def reply_modify(request, pk):
    try:
        reply = Reply.objects.get(pk=pk)
    except Reply.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = CreateReplySerializer(reply, data=request.data, context={'request': request})
        if serializer.is_valid():
            if serializer.validated_data['user'] != request.user:
                raise PermissionDenied
            else:
                serializer.save()
                return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        reply.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Potentially relevant for future features:

# @api_view(['GET'])
# @permission_classes([permissions.IsAuthenticated])
# def users(request):
#     if request.method == 'GET':
#         data = User.objects.all()

#         serializer = UserSerializer(data, context={'request': request}, many=True)

#         return Response(serializer.data)