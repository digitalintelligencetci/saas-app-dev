# forms.py
from django import forms
from .models import Contact

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'message']

        widgets = {
            'name': forms.TextInput(attrs={'class': 'input'}),  # Bulma 'input' class
            'email': forms.EmailInput(attrs={'class': 'input'}),  # Bulma 'input' class
            'message': forms.Textarea(attrs={'class': 'textarea'}),  # Bulma 'textarea' class
        }

        labels = {
            'name': 'Your name',
            'email': 'Your email',
            'message': 'Your message',
        }

        error_messages = {
            'name': {
                'required': 'Please enter your name.',
            },
            'email': {
                'required': 'Please enter your email.',
            },
            'message': {
                'required': 'Please enter your message.',
            }
        }