# Generated by Django 5.0.2 on 2024-02-10 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_eusers_email_alter_eusers_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eusers',
            name='password',
            field=models.CharField(max_length=100),
        ),
    ]
