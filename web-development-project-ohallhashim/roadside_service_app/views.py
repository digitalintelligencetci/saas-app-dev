from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from django.db.models import Q
import stripe
import json
from datetime import datetime, timedelta
from .forms import ContactForm, UserRegistrationForm, UserLoginForm, BookingForm, UserProfileForm
from .models import Contact, Service, Booking, Payment, Notification, User

# Configure Stripe
stripe.api_key = 'sk_test_your_secret_key'  # Replace with your actual Stripe secret key

def home(request):
    services = Service.objects.filter(is_active=True)[:6]
    context = {
        'services': services,
        'user': request.user
    }
    return render(request, 'home.html', context)

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Thank you for your message! We will get back to you soon.')
            return redirect('home')
    else:
        form = ContactForm()

    return render(request, 'contact.html', {'form': form})

def services(request):
    services = Service.objects.filter(is_active=True)
    return render(request, 'services.html', {'services': services})

def about(request):
    return render(request, 'about.html')

def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, 'Account created successfully! Welcome to Provo Roadside Service.')
            return redirect('dashboard')
    else:
        form = UserRegistrationForm()
    
    return render(request, 'auth/register.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        form = UserLoginForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f'Welcome back, {user.first_name or user.username}!')
                return redirect('dashboard')
    else:
        form = UserLoginForm()
    
    return render(request, 'auth/login.html', {'form': form})

def user_logout(request):
    logout(request)
    messages.info(request, 'You have been logged out successfully.')
    return redirect('home')

@login_required
def dashboard(request):
    user_bookings = Booking.objects.filter(user=request.user).order_by('-created_at')[:5]
    notifications = Notification.objects.filter(user=request.user, is_read=False).order_by('-created_at')[:5]
    
    context = {
        'user_bookings': user_bookings,
        'notifications': notifications,
    }
    return render(request, 'dashboard.html', context)

@login_required
def book_service(request):
    if request.method == 'POST':
        form = BookingForm(request.POST)
        if form.is_valid():
            booking = form.save(commit=False)
            booking.user = request.user
            booking.save()
            
            # Create notification
            Notification.objects.create(
                user=request.user,
                notification_type='booking_confirmed',
                title='Booking Confirmed',
                message=f'Your booking for {booking.service.name} has been confirmed.',
                related_booking=booking
            )
            
            messages.success(request, 'Booking created successfully! Please complete payment.')
            return redirect('payment', booking_id=booking.id)
    else:
        form = BookingForm()
    
    return render(request, 'booking/book_service.html', {'form': form})

@login_required
def payment(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id, user=request.user)
    
    if request.method == 'POST':
        try:
            # Create Stripe payment intent
            intent = stripe.PaymentIntent.create(
                amount=int(booking.service.price * 100),  # Convert to cents
                currency='usd',
                metadata={'booking_id': str(booking.id)}
            )
            
            booking.stripe_payment_intent_id = intent.id
            booking.save()
            
            return JsonResponse({
                'client_secret': intent.client_secret,
                'booking_id': str(booking.id)
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=403)
    
    context = {
        'booking': booking,
        'stripe_public_key': 'pk_test_your_publishable_key'  # Replace with your actual key
    }
    return render(request, 'booking/payment.html', context)

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, 'whsec_your_webhook_secret'  # Replace with your webhook secret
        )
    except ValueError as e:
        return JsonResponse({'error': 'Invalid payload'}, status=400)
    except stripe.error.SignatureVerificationError as e:
        return JsonResponse({'error': 'Invalid signature'}, status=400)
    
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        booking_id = payment_intent['metadata']['booking_id']
        
        try:
            booking = Booking.objects.get(id=booking_id)
            booking.payment_status = 'completed'
            booking.status = 'confirmed'
            booking.save()
            
            # Create payment record
            Payment.objects.create(
                booking=booking,
                amount=booking.service.price,
                stripe_payment_intent_id=payment_intent['id'],
                payment_status='completed'
            )
            
            # Create notification
            Notification.objects.create(
                user=booking.user,
                notification_type='payment_received',
                title='Payment Received',
                message=f'Payment of ${booking.service.price} received for {booking.service.name}.',
                related_booking=booking
            )
            
        except Booking.DoesNotExist:
            pass
    
    return JsonResponse({'status': 'success'})

@login_required
def booking_history(request):
    bookings = Booking.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'booking/booking_history.html', {'bookings': bookings})

@login_required
def booking_detail(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id, user=request.user)
    return render(request, 'booking/booking_detail.html', {'booking': booking})

@login_required
def profile(request):
    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully!')
            return redirect('profile')
    else:
        form = UserProfileForm(instance=request.user)
    
    return render(request, 'profile.html', {'form': form})

@login_required
def notifications(request):
    notifications = Notification.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'notifications.html', {'notifications': notifications})

@login_required
def mark_notification_read(request, notification_id):
    notification = get_object_or_404(Notification, id=notification_id, user=request.user)
    notification.is_read = True
    notification.save()
    return JsonResponse({'status': 'success'})
