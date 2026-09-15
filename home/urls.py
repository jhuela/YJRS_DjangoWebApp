from django.urls import path
from . import views

urlpatterns = [
    path("", views.welcome, name="welcome"),
    path("dynamic-form/", views.dynamic_form, name="dynamic_form"),
]