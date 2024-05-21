# Generated by Django 5.0.6 on 2024-05-21 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yaLazizApp', '0007_instruction'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='coverPhoto',
            field=models.ImageField(upload_to='Photos/'),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='mainPhoto',
            field=models.ImageField(upload_to='Photos/'),
        ),
        migrations.AlterField(
            model_name='user',
            name='userphoto',
            field=models.ImageField(default='static/Photos/acc pic.png', upload_to='Photos/'),
        ),
    ]