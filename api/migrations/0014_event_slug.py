# Generated by Django 4.1.4 on 2023-01-02 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_ourpartner'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='slug',
            field=models.SlugField(blank=True, max_length=250, null=True),
        ),
    ]
