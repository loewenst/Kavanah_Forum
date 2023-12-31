"""
URL configuration for kavanah_forum project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from app import views

urlpatterns = [
    #Admin
    path('admin/', admin.site.urls),
    #Oauth
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),
    #API URLS
    re_path(r'^api/topics/$', views.topics),
    re_path(r'^api/topics/([0-9]*)$', views.topic_detail),
    re_path(r'^api/posts/$', views.posts),
    re_path(r'^api/latestposts/$', views.latestposts),
    re_path(r'^api/questions/$', views.questions),
    re_path(r'^api/latestquestions/$', views.latestquestions),
    re_path(r'^api/createpost/$', views.createpost),
    re_path(r'^api/createquestion/$', views.createquestion),
    re_path(r'^api/posts/([0-9]*)$', views.post_detail),
    re_path(r'^api/questions/([0-9]*)$', views.question_detail),
    re_path(r'^api/modifypost/([0-9]*)$', views.post_modify),
    re_path(r'^api/modifyquestion/([0-9]*)$', views.question_modify),
    re_path(r'^api/postcomment/$', views.postcomment),
    path('api/comments/', views.comments),
    re_path(r'^api/modifycomment/([0-9]*)$', views.comment_modify),
    re_path(r'^api/postreply/$', views.postreply),
    path('api/replies/', views.replies),
    re_path(r'^api/modifyreply/([0-9]*)$', views.reply_modify),
    re_path(r'^api/user_info/$', views.user_info),
    path('api/subtopics/', views.subtopics),
]
