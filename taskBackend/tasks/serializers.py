from django.db import transaction
from .models import User
from rest_framework import serializers
from .models import Task, User
from django.contrib.auth.hashers import make_password


class TaskSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(
        source="author.name", read_only=True
    )  # Get the author's name

    class Meta:
        model = Task
        fields = ["id", "title", "description", "status",
                  "priority", "created_at", "end_at", "author_name"]

    def create(self, validated_data):
        """ ✅ Assign the currently logged-in user as the task's author """
        request = self.context.get('request')

        if not request or not hasattr(request, "user") or not request.user.is_authenticated:
            raise serializers.ValidationError(
                {"author": "User must be authenticated to create a task."}
            )

        validated_data["author"] = request.user  # ✅ Assign authenticated user
        return super().create(validated_data)


class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'confirm_password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        """ ✅ Ensure passwords match """
        if data.get("password") != data.get("confirm_password"):
            raise serializers.ValidationError(
                {"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        """ ✅ Remove confirm_password before saving """
        validated_data.pop('confirm_password')
        validated_data['password'] = make_password(validated_data['password'])

        # ✅ Create user WITHOUT requiring any foreign key constraints
        return User.objects.create(**validated_data)
