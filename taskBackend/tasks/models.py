from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.db import models
from django.utils.timezone import now

# Create your models here.
from django.contrib.auth.hashers import make_password, check_password


from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.hashers import make_password, check_password


class UserManager(BaseUserManager):
    def create_user(self, name, email, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(name=name, email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, email, password):
        user = self.create_user(name, email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "name"
    REQUIRED_FIELDS = ["email"]

    def save(self, *args, **kwargs):
        """Automatically hash password before saving"""
        if self.password and not self.password.startswith("pbkdf2_sha256$"):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    def __str__(self):
        return self.name


class TaskManager(models.Manager):
    def create_task(self, title, description, author=None, priority="P0", status="Pending"):
        """Custom method to create tasks"""
        if author and not User.objects.filter(id=author.id).exists():
            raise ValueError("Author does not exist")

        task = self.model(
            title=title,
            description=description,
            author=author,
            priority=priority,
            status=status,
        )
        task.save(using=self._db)
        return task


class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255, default="")
    status = models.CharField(max_length=255, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)
    end_at = models.DateTimeField(default=now)
    priority = models.CharField(max_length=255, default="P0")

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True
    )

    objects = TaskManager()  # ✅ Using custom TaskManager

    def set_priority(self, priority_level):
        """Set priority dynamically, similar to set_password in User"""
        valid_priorities = ["P0", "P1", "P2", "P3"]
        if priority_level in valid_priorities:
            self.priority = priority_level
            self.save()
        else:
            raise ValueError("Invalid priority level")

    def set_status(self, new_status):
        """Change status dynamically"""
        valid_statuses = ["Pending", "In Progress", "Completed"]
        if new_status in valid_statuses:
            self.status = new_status
            self.save()
        else:
            raise ValueError("Invalid status")

    def __str__(self):
        return f"{self.title} - {self.status}"
