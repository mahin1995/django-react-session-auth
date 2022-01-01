from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserProfile
from .serializer import UserProfileSerializer


class GetUserProfileView(APIView):
    def get(self,request,format=None):
        try:
            currrent_user=self.request.user
            # select_user=User.objects.get(id=currrent_user.id)
            username=currrent_user.username
            user_profile=UserProfile.objects.get(user=currrent_user)
            user_profile=UserProfileSerializer(user_profile)
            return Response({'profile':user_profile.data,"username":username})
        except Exception as e:
            print(str(e))
            return Response({'error':str(e)})

class UpdateProfileView(APIView):
    def put(self,request,format=None):
        currrent_user=self.request.user
        username=currrent_user.username
        data=self.request.data
        first_name=data['first_name']
        last_name=data['last_name']
        phone=data['phone']
        city=data['city']
        # select_user=User.objects.get(id=user.id)
        UserProfile.objects.filter(user=currrent_user).update(first_name=first_name,last_name=last_name,phone=phone,city=city)
        user_profile=UserProfile.objects.get(user=currrent_user)
        user_profile=UserProfileSerializer(user_profile)
        return Response({'profile':user_profile.data,"username":username})


