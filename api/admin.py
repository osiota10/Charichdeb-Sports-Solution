from django.contrib import admin
from . models import *
from django.contrib.auth.admin import UserAdmin
from .models import UserAccount
from .forms import UserChangeForm, UserCreationForm

# Register your models here.


class CustomUserAdmin(UserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    ordering = ('email',)
    list_display = ('first_name', 'last_name', 'email',
                    'is_featured', 'is_active', 'is_staff', 'is_superuser')
    model = UserAccount
    fieldsets = (
        (None, {'fields': ('image', 'password',)}),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email', 'gender', 'phone_number', 'date_of_birth', 'sport', 'height', 'weight',)}),
        ('Featured Athlete', {
            'fields': ('is_featured',)}),
        ('Contact Address', {
         'fields': ('home_address', 'local_govt', 'state_of_origin', 'nationality',)}),
        ('Permissions', {
         'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {
            'fields': ('date_joined', 'last_login',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('first_name', 'last_name', 'email', 'phone_number', 'password1', 'password2')}
         ),
    )


admin.site.register(UserAccount, CustomUserAdmin)
admin.site.register(WorkProcess)
admin.site.register(Service)
admin.site.register(Event)
admin.site.register(Testimonial)
admin.site.register(CoreValue)
admin.site.register(CompanyInformation)
admin.site.register(Stat)
admin.site.register(OurStory)
admin.site.register(SocialMediaHandle)
admin.site.register(OurPartner)
admin.site.register(ContactUs)
admin.site.register(SportStat)
admin.site.register(SportsCoverage)



admin.site.site_header = 'Charichdeb Sports Solution Admin'
admin.site.site_title = 'Charichdeb Sports Solution Admin'
