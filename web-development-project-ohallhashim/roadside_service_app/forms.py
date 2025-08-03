# forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model
from .models import Contact, Booking, Service, User

User = get_user_model()

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'subject', 'message']

        widgets = {
            'name': forms.TextInput(attrs={'class': 'input'}),
            'email': forms.EmailInput(attrs={'class': 'input'}),
            'subject': forms.TextInput(attrs={'class': 'input'}),
            'message': forms.Textarea(attrs={'class': 'textarea'}),
        }

        labels = {
            'name': 'Your name',
            'email': 'Your email',
            'subject': 'Subject',
            'message': 'Your message',
        }

        error_messages = {
            'name': {
                'required': 'Please enter your name.',
            },
            'email': {
                'required': 'Please enter your email.',
            },
            'subject': {
                'required': 'Please enter a subject.',
            },
            'message': {
                'required': 'Please enter your message.',
            }
        }

class UserRegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'class': 'input'}))
    phone_number = forms.CharField(max_length=20, required=False, widget=forms.TextInput(attrs={'class': 'input'}))
    address = forms.CharField(widget=forms.Textarea(attrs={'class': 'textarea', 'rows': 3}), required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            if hasattr(field, 'widget') and hasattr(field.widget, 'attrs'):
                if 'class' not in field.widget.attrs:
                    field.widget.attrs['class'] = 'input'

class UserLoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'input', 'placeholder': 'Username'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'input', 'placeholder': 'Password'}))

class BookingForm(forms.ModelForm):
    service = forms.ModelChoiceField(
        queryset=Service.objects.filter(is_active=True),
        widget=forms.Select(attrs={'class': 'select'})
    )
    booking_date = forms.DateTimeField(
        widget=forms.DateTimeInput(attrs={'class': 'input', 'type': 'datetime-local'})
    )
    location = forms.CharField(
        widget=forms.Textarea(attrs={'class': 'textarea', 'rows': 3, 'placeholder': 'Enter your exact location'})
    )
    vehicle_info = forms.CharField(
        widget=forms.Textarea(attrs={'class': 'textarea', 'rows': 2, 'placeholder': 'Vehicle make, model, year, color'}), 
        required=False
    )
    notes = forms.CharField(
        widget=forms.Textarea(attrs={'class': 'textarea', 'rows': 3, 'placeholder': 'Any additional notes or special requirements'}), 
        required=False
    )

    class Meta:
        model = Booking
        fields = ['service', 'booking_date', 'location', 'vehicle_info', 'notes']

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'address']
        widgets = {
            'first_name': forms.TextInput(attrs={'class': 'input'}),
            'last_name': forms.TextInput(attrs={'class': 'input'}),
            'email': forms.EmailInput(attrs={'class': 'input'}),
            'phone_number': forms.TextInput(attrs={'class': 'input'}),
            'address': forms.Textarea(attrs={'class': 'textarea', 'rows': 3}),
        }