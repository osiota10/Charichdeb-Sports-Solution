from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializer import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import AllowAny


# Create your views here.


class WorkProcessView(generics.ListAPIView):
    queryset = WorkProcess.objects.all()
    serializer_class = WorkProcessSerializer
    permission_classes = [AllowAny,]


class ServiceView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny,]


class EventView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny,]


class EventDetail(generics.RetrieveAPIView):
    lookup_field = 'slug'
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    permission_classes = [AllowAny,]


class TestimonialView(generics.ListAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerialer
    permission_classes = [AllowAny,]


class CoreValueView(generics.ListAPIView):
    queryset = CoreValue.objects.all()
    serializer_class = CoreValueSerializer
    permission_classes = [AllowAny,]


class CompanyInformortionView(generics.RetrieveAPIView):
    lookup_field = 'id'
    queryset = CompanyInformation.objects.all()
    serializer_class = CompanyInformationSerializer
    permission_classes = [AllowAny,]


class StatView(generics.ListAPIView):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer
    permission_classes = [AllowAny,]


class OurStoryView(generics.ListAPIView):
    queryset = OurStory.objects.all()
    serializer_class = OurStorySerializer
    permission_classes = [AllowAny,]


class SocialMediaView(generics.ListAPIView):
    queryset = SocialMediaHandle.objects.all()
    serializer_class = SocialMediaHandleSerializer
    permission_classes = [AllowAny,]


class OurPartnerView(generics.ListAPIView):
    queryset = OurPartner.objects.all()
    serializer_class = OurPartnerSerializer
    permission_classes = [AllowAny,]


class ContactUsView(generics.CreateAPIView):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer
    permission_classes = [AllowAny,]


class FeatureAthleteView(generics.ListAPIView):
    queryset = UserAccount.objects.filter(is_featured=True)
    serializer_class = FeatureAthleteSerializer
    permission_classes = [AllowAny,]
