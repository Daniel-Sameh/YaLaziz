# Generated by Django 5.0.6 on 2024-05-22 09:58

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("yaLazizApp", "0010_alter_ingredient_quantity"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="userphoto",
            field=models.ImageField(default="Photos/acc pic.png", upload_to="Photos/"),
        ),
    ]
