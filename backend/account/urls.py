
from django.urls import path
from .views import *
urlpatterns = [
    path('authenticated',CheckAuthenticatedView.as_view()),
    path('login',LoginView.as_view()),
    path('logout',LogoutView.as_view()),
    path('register',SignupView.as_view()),
    path('delete',DeleteAcountview.as_view()),
    path('get_user',GetUsersView.as_view()),
    path('csrf_cookie',GetCSRFToken.as_view())
]