from django.urls import path
from .views import *

urlpatterns = [
    path('work-process', WorkProcessView.as_view()),
    path('services', ServiceView.as_view()),
    path('events', EventView.as_view()),
    path('events/<slug:slug>', EventDetail.as_view()),
    path('testimonials', TestimonialView.as_view()),
    path('core-values', CoreValueView.as_view()),
    path('company-information/<int:id>', CompanyInformortionView.as_view()),
    path('stat', StatView.as_view()),
    path('our-story', OurStoryView.as_view()),
    path('socials', SocialMediaView.as_view()),
    path('partners', OurPartnerView.as_view()),
    path('contact-us', ContactUsView.as_view()),
    path('featured-athletes', FeatureAthleteView.as_view()),
    path('sport-stat', SportStatListCreateView.as_view()),
    path('sport-stat/<int:id>', SportStatRetrieveUpdateDestroyView.as_view()),
    path('sportcoverage', SportsCoverageView.as_view()),
    path('dashboard-testimonials', TestimonialDashboardView.as_view()),
]
