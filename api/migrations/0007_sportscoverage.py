# Generated by Django 4.1.4 on 2023-05-09 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_sportstat_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='SportsCoverage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
    ]
