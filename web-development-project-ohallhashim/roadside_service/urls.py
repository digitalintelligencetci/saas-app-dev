from django.contrib import admin
from django.urls import path, include
from roadside_service_app import views  # Make sure you're importing views from the app

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin panel URL
    path('', include('roadside_service_app.urls')),
    path('', views.home, name='home'),  # Home page
    path('contact/', views.contact, name='contact'),  # Contact page
    path('services/', views.services, name='services'),  # Services page
    path('about/', views.about, name='about'),  # About page
]