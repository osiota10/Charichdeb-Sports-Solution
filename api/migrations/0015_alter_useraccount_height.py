# Generated by Django 4.1.4 on 2023-08-22 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_delete_blacklistedtoken'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='height',
            field=models.FloatField(blank=True, null=True),
        ),
    ]