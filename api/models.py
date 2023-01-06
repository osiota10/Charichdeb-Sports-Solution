from django.db import models
from cloudinary.models import CloudinaryField
from ckeditor.fields import RichTextField

# Create your models here.


class CompanyInformation(models.Model):
    logo = CloudinaryField()
    site_page_header_image = CloudinaryField()
    company_name = models.CharField(max_length=100)
    CAC_number = models.CharField(max_length=15, null=True, blank=True)
    address = models.CharField(max_length=50)
    tag_line = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField()
    telephone = models.CharField(max_length=14)
    telephone_2 = models.CharField(max_length=14, null=True, blank=True)
    about_company = RichTextField()
    terms_and_conditions = RichTextField(null=True, blank=True)
    privacy_policy = RichTextField(null=True, blank=True)

    def get_logo_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.logo}")

    def get_site_header_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.site_page_header_image}")

    class Meta:
        verbose_name_plural = "Company Information"

    def __str__(self):
        return f"{self.company_name}-{self.CAC_number}"


class WorkProcess(models.Model):
    title = models.CharField(max_length=25)
    body = RichTextField()

    class Meta:
        verbose_name_plural = "Work Processes"

    def __str__(self):
        return f"{self.title}"


class Service(models.Model):
    image = CloudinaryField('image')
    title = models.CharField(max_length=32)
    body = RichTextField()

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.image}")

    def __str__(self):
        return f"{self.title}"


class Event(models.Model):
    date_added = models.DateField(auto_now_add=True)
    image = CloudinaryField('image')
    title = models.CharField(max_length=32)
    body = RichTextField()
    event_date = models.DateField()
    slug = models.SlugField(max_length=250, blank=True, null=True)

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.image}")

    def __str__(self):
        return f"{self.title}"


class Testimonial(models.Model):
    date_added = models.DateField(auto_now_add=True)
    image = CloudinaryField('image')
    name = models.CharField(max_length=32)
    designation = models.CharField(max_length=32)
    body = RichTextField()

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.image}")

    def __str__(self):
        return f"{self.name}"


class CoreValue(models.Model):
    image = CloudinaryField('image')
    title = models.CharField(max_length=32)
    body = RichTextField()

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.image}")

    def __str__(self):
        return f"{self.title}"


class Stat(models.Model):
    stat_figure = models.IntegerField()
    stat_title = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.stat_title}-{self.stat_figure}"


class OurStory(models.Model):
    image = CloudinaryField('image', null=True, blank=True)
    title = models.CharField(max_length=100)
    body = RichTextField()

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.image}")

    class Meta:
        verbose_name_plural = "Our Stories"

    def __str__(self):
        return f"{self.title}"


class SocialMediaHandle(models.Model):
    font_awesome_class = models.CharField(max_length=30)
    name = models.CharField(max_length=50)
    url = models.URLField()

    def __str__(self):
        return f"{self.name}"


class OurPartner(models.Model):
    name = models.CharField(max_length=100)
    logo = CloudinaryField()

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.logo}")

    def __str__(self):
        return f"{self.name}"
