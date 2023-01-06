from rest_framework import serializers
from .models import *


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
        fields = ('id', 'title', 'body', 'get_image_url', 'event_date', 'slug')


class TestimonialSerialer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ('id', 'name', 'designation', 'body', 'get_image_url')


class CoreValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreValue
        fields = ('id', 'title', 'body', 'get_image_url')


class CompanyInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInformation
        fields = ('id', 'get_logo_url', 'get_site_header_url', 'company_name', 'CAC_number', 'address', 'tag_line',
                  'email', 'telephone', 'telephone_2', 'about_company', 'terms_and_conditions', 'privacy_policy')


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
