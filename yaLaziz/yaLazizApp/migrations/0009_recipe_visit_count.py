# Generated by Django 5.0.6 on 2024-05-21 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yaLazizApp', '0008_alter_recipe_coverphoto_alter_recipe_mainphoto_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='visit_count',
            field=models.PositiveIntegerField(default=0),
        ),
    ]