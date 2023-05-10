from django.db.models.signals import pre_save, post_save
from .utils import unique_slug_generator
from .models import *
from django.core.mail import send_mail
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()


def slug_generator(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)


pre_save.connect(slug_generator, sender=Event)


@receiver(post_save, sender=User)
def send_new_user_email(sender, instance, created, **kwargs):
    if created:
        subject = 'New User Registration'
        message = render_to_string('new_user_email.html', {'user': instance})
        from_email = settings.EMAIL_HOST_USER
        recipient_list = ['osiotaobrozie@gmail.com']
        send_mail(subject, message, from_email, recipient_list, html_message=message)

@receiver(post_save, sender=ContactUs)
def send_new_contact_inquiry_email(sender, instance, created, **kwargs):
    if created:
        subject = 'Contact Inquiry'
        message = render_to_string('new_contact_inquiry_email.html', {'user': instance})
        from_email = settings.EMAIL_HOST_USER
        recipient_list = ['osiotaobrozie@gmail.com']
        send_mail(subject, message, from_email, recipient_list, html_message=message)