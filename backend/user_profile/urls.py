
from django.urls import path

from user_profile.views import GetUserProfileView,UpdateProfileView
urlpatterns = [
        path('user',GetUserProfileView.as_view()),
        path('update-profile',UpdateProfileView.as_view())
]