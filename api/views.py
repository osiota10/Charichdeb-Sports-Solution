from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializer import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from djoser.views import UserViewSet
from rest_framework.views import APIView
from rest_framework import status


# Create your views here.

class UserUpdateView(UserViewSet):
    # Use your custom serializer for updating user information
    serializer_class = UserInfoSerializer

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)

        # Perform additional actions after updating user information if needed

        return response


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
    queryset = UserAccount.objects.filter(is_featured=True, is_superuser=False)
    serializer_class = FeatureAthleteSerializer
    permission_classes = [AllowAny,]


class SportStatListCreateView(generics.ListCreateAPIView):
    serializer_class = SportStatSerializer
    permission_classes = [IsAuthenticated,]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return SportStat.objects.filter(user=self.request.user)


class SportStatRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SportStatSerializer
    permission_classes = [IsAuthenticated,]
    lookup_field = "id"

    def get_queryset(self):
        return SportStat.objects.filter(user=self.request.user)


class SportsCoverageView(generics.ListAPIView):
    serializer_class = SportsCoverageSerializer
    queryset = SportsCoverage.objects.all()
    permission_classes = [AllowAny,]


class TestimonialDashboardView(APIView):
    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        info = Testimonial.objects.filter(user=self.request.user)
        serializer = TestimonialSerialer(info, many=True)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        testimonial_id = request.data.get('id')

        try:
            testimonial = Testimonial.objects.get(
                id=testimonial_id, user=self.request.user)
        except Testimonial.DoesNotExist:
            return Response({'error': 'Testimonial not found.'}, status=404)

        serializer = TestimonialSerialer(testimonial, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)

        return Response(serializer.errors, status=400)

    def post(self, request, *args, **kwargs):
        designation = request.data.get('designation')
        body = request.data.get('body')

        if not designation or not body:
            return Response({'error': 'Designation and Body are required fields.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            testimonial = Testimonial.objects.create(
                user=request.user, designation=designation, body=body)

            serializer = TestimonialSerialer(testimonial)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
