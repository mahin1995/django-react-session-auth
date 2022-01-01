from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from user_profile.models import UserProfile
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_protect
from django.utils.decorators import method_decorator
import json
from django.contrib.auth import authenticate,login,logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from .serializers import UserSerializer


def get_csrf(request):
    response = JsonResponse({"Info": "Success - Set CSRF cookie"})
    response["X-CSRFToken"] = get_token(request)
    return response




class CheckAuthenticatedView(APIView):
    def get(self,request,format=None):
        user=self.request.user
        print(user)
        try:
            isAuthenticated=user.is_authenticated
            print(isAuthenticated)
            if(isAuthenticated):
                return Response({"isAuthenticated":'Success'})
            else:
                return Response({"isAuthenticated":"Error"})
        except:
            return Response({"error":"somthing went wrong when checking authentication"})


@method_decorator(csrf_protect,name='dispatch')
class SignupView(APIView):
    permission_class=(permissions.AllowAny)
    def post(self,request,format=None):
        data=self.request.data
        print(data)
        username=data['username']
        password=data['password']
        re_password=data['re_password']
        try:
            if password==re_password:
                if User.objects.filter(username=username).exists():
                        return Response({ 'error': 'Username already exists' })
                else:
                    if len(password)<6:
                        return Response({'error':"Password must be at least 6 character"})
                    else:
                        user=User.objects.create_user(username=username,password=password)
                        user=User.objects.get(id=user.id)

                        user_profile=UserProfile.objects.create(user=user,first_name='',last_name="",phone='',city='')
                        return Response({ 'success': 'User created successfully' })
            else:
                return Response({'error':'password don\'t match'})
        except:
            return Response({ 'error': 'Something went wrong when registering account' })
        

@method_decorator(csrf_protect,name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self,request,format=None):
        data=self.request.data
        username=data['username']
        password=data['password']
        print(username)
        print(password)
        try:
            user=authenticate(self.request,username=username,password=password)
            print(user)
            if user is not None:
                login(request,user)
                return Response({'success':"user is authenticated","username":username})
            else:
                return Response({"error":"Error on Authenticated"})
        except Exception as e:
            print(e)
            return Response({'error':"Something went wrong errors=="+str(e)})

class LogoutView(APIView):
    def post(self,request,format=None):
        try:
            logout(request)
            return Response({"success":"successfully logging out"})
        except:
            return Response({"error":"Something went wrong when logging out"})

class DeleteAcountview(APIView):
    def delete(self,request,format=None):
        user=self.request.user
        try:
            User.objects.filter(id=user.id).delete()
            return Response({'Success':"User Delete Successfully"})
        except:
            return Response({'error':"Something went wrong when trying to delete user"})




@method_decorator(ensure_csrf_cookie,name='dispatch')
class GetCSRFToken(APIView):
    permission_class=(permissions.AllowAny)

    def get(self,request,format=None):
        return Response({'success':'CSRF cookie set'})



class GetUsersView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self,request,format=None):
        users=User.objects.all()
        users=UserSerializer(users,many=True)
        return Response(users.data) 