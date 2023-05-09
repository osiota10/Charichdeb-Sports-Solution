from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from cloudinary.models import CloudinaryField
from ckeditor.fields import RichTextField
from django.utils.html import strip_tags
from django.conf import settings
from django.utils.html import strip_tags

# # Create your models here.


class UserAccountManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):

        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class UserAccount(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.IntegerField()
    date_of_birth = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    image = CloudinaryField('image', null=True, blank=True)
    height = models.IntegerField(null=True, blank=True)
    weight = models.IntegerField(null=True, blank=True)
    phone_number = models.IntegerField()
    gender = models.CharField(max_length=255, null=True, blank=True)
    sport = models.CharField(max_length=255, null=True, blank=True)
    home_address = models.TextField(null=True, blank=True)
    local_govt = models.CharField(max_length=255, null=True, blank=True)
    state_of_origin = models.CharField(max_length=255, null=True, blank=True)
    nationality = models.CharField(max_length=255, null=True, blank=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone_number']
    ordering = ('email',)

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.image}")

    @property
    def get_photo_url(self):
        if self.image and hasattr(self.image, 'url'):
            return self.image.url
        else:
            return "https://cdn-icons-png.flaticon.com/512/147/147142.png"

    def __str__(self):
        return self.email


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

    def safe_about_body_html(self):
        return strip_tags(self.about_company)

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

    def safe_body_html(self):
        return strip_tags(self.body)

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
    image = CloudinaryField('image')
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


class ContactUs(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    full_name = models.CharField(max_length=50)
    email = models.EmailField()
    location = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15)
    message = RichTextField()

    def __str__(self):
        return f"{self.full_name}"

    class Meta:
        verbose_name_plural = "Contact Us"


class SportStat(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='sportstats',
                             on_delete=models.CASCADE)
    event = models.CharField(max_length=50)
    pb = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.event}- {self.pb}"

class SportsCoverage(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name}"