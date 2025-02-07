from django.urls import path
from . import views

urlpatterns = [
    path("tasks/", views.get_tasks, name="task-list"),
    path("tasks/create/", views.create_task, name="create_task"),
    path('signin/', views.signin_user, name='signin'),
]
