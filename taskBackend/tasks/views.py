from rest_framework.authtoken.models import Token
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from django.db import transaction
from django.contrib.auth.hashers import check_password
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import Task, User
from .serializers import TaskSerializer, UserSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])  # ✅ Requires authenticatio
def get_tasks(request):
    print("🚀 get_tasks API called!", flush=True)  # ✅ Should always print

    if not request.user or request.user.is_anonymous:
        print("❌ User is NOT authenticated", flush=True)
        return Response({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

    print("✅ User is authenticated:", request.user, flush=True)

    tasks = Task.objects.filter(author=request.user)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_task(request):
    print("🚀 create_task API called!")
    print(f"✅ User is authenticated: {request.user}")  # Debugging
    """
    ✅ Creates a task and assigns the authenticated user as the author.
    """
    serializer = TaskSerializer(
        data=request.data, context={'request': request})

    if serializer.is_valid():
        task = serializer.save()  # No need to pass author=request.user, handled in serializer
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def signin_user(request):
    name = request.data.get("name")
    password = request.data.get("password")

    try:
        user = User.objects.get(name=name)
    except User.DoesNotExist:
        return Response({"error": "Invalid name or password"}, status=400)

    if check_password(password, user.password):  # ✅ Manually check password
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            "message": "Login successful",
            "user_id": user.id,
            "name": user.name,
            "access": access_token,
            "refresh": str(refresh)
        })

    return Response({"error": "Invalid credentials"}, status=400)
