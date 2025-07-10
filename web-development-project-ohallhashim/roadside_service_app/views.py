from django.shortcuts import render, redirect
from .forms import ContactForm

def home(request):
    return render(request, 'home.html')

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()  # Saves the data to the database
            return redirect('home')  # Redirect to a success page or home page
    else:
        form = ContactForm()

    return render(request, 'contact.html', {'form': form})

def services(request):
    return render(request, 'services.html')

def about(request):
    return render(request, 'about.html')
