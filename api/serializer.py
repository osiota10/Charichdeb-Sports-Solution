from rest_framework import serializers
from .models import *
from djoser.serializers import UserCreateSerializer, UserSerializer
from django.contrib.auth import get_user_model

user = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = user
        fields = ('id', 'username', 'first_name',
                  'last_name', 'phone_number', 'email', 'password')


class UserInfoSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = user
        fields = ('id', 'first_name', 'last_name',
                  'phone_number', 'email', 'get_photo_url', 'date_of_birth', 'height', 'weight', 'gender', 'sport', 'home_address', 'local_govt', 'state_of_origin', 'nationality', 'image',)

        def update(self, instance, validated_data):
            instance = super().update(instance, validated_data)

            # Perform custom update logic here
            instance.first_name = validated_data.get(
                'first_name', instance.first_name)
            instance.last_name = validated_data.get(
                'last_name', instance.last_name)
            instance.phone_number = validated_data.get(
                'phone_number', instance.phone_number)
            instance.date_of_birth = validated_data.get(
                'date_of_birth', instance.date_of_birth)
            instance.gender = validated_data.get('gender', instance.gender)
            instance.height = validated_data.get(
                'height', instance.height)
            instance.weight = validated_data.get(
                'weight', instance.weight)
            instance.sport = validated_data.get(
                'sport', instance.sport)
            instance.nationality = validated_data.get(
                'nationality', instance.nationality)
            instance.state_of_origin = validated_data.get(
                'state_of_origin', instance.state_of_origin)
            instance.local_govt = validated_data.get(
                'local_govt', instance.local_govt)
            instance.home_address = validated_data.get(
                'home_address', instance.home_address)

            # Update image field
            if 'image' in validated_data:
                instance.image = validated_data['image']

            instance.save()
            return instance


class WorkProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkProcess
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('id', 'title', 'body', 'get_image_url')


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'title', 'safe_body_html',
                  'get_image_url', 'event_date', 'slug')


class TestimonialSerialer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ('id', 'name', 'designation', 'body',
                  'get_image_url', 'is_featured')


class CoreValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreValue
        fields = ('id', 'title', 'body', 'get_image_url')


class CompanyInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInformation
        fields = ('id', 'get_logo_url', 'get_site_header_url', 'company_name', 'CAC_number', 'address', 'tag_line',
                  'email', 'telephone', 'telephone_2', 'about_company', 'terms_and_conditions', 'privacy_policy', 'safe_about_body_html')


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = '__all__'


class OurStorySerializer(serializers.ModelSerializer):
    class Meta:
        model = OurStory
        fields = ('id', 'get_image_url', 'title', 'body')


class SocialMediaHandleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMediaHandle
        fields = '__all__'


class OurPartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = OurPartner
        fields = ('id', 'name', 'get_image_url')


class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = ('id', 'full_name', 'location',
                  'email', 'phone_number', 'message')


class FeatureAthleteSerializer(serializers.ModelSerializer):
    sportstats = serializers.StringRelatedField(many=True)

    class Meta:
        model = UserAccount
        fields = ('id', 'first_name', 'last_name', 'get_photo_url',
                  'sport', 'state_of_origin', 'nationality', 'weight', 'height', 'sportstats')


class SportStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = SportStat
        fields = ('id', 'event', 'pb')


class SportsCoverageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SportsCoverage
        fields = '__all__'
