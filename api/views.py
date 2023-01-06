from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializer import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer


# Create your views here.


class WorkProcessView(generics.ListAPIView):
    queryset = WorkProcess.objects.all()
    serializer_class = WorkProcessSerializer


class ServiceView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class EventView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventDetail(generics.RetrieveAPIView):
    lookup_field = 'slug'
    serializer_class = EventSerializer
    queryset = Event.objects.all()


class TestimonialView(generics.ListAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerialer


class CoreValueView(generics.ListAPIView):
    queryset = CoreValue.objects.all()
    serializer_class = CoreValueSerializer


class CompanyInformortionView(generics.RetrieveAPIView):
    lookup_field = 'id'
    queryset = CompanyInformation.objects.all()
    serializer_class = CompanyInformationSerializer


class StatView(generics.ListAPIView):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer


class OurStoryView(generics.ListAPIView):
    queryset = OurStory.objects.all()
    serializer_class = OurStorySerializer


class SocialMediaView(generics.ListAPIView):
    queryset = SocialMediaHandle.objects.all()
    serializer_class = SocialMediaHandleSerializer


class OurPartnerView(generics.ListAPIView):
    queryset = OurPartner.objects.all()
    serializer_class = OurPartnerSerializer
