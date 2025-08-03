from django.core.management.base import BaseCommand
from roadside_service_app.models import Service

class Command(BaseCommand):
    help = 'Set up initial services for the roadside service application'

    def handle(self, *args, **options):
        services_data = [
            {
                'name': 'Flat Tire Repair',
                'description': 'Professional tire replacement service. We\'ll come to your location and replace your flat tire with a spare or repair the existing tire if possible.',
                'price': 75.00,
                'duration': 30,
                'icon': 'tire'
            },
            {
                'name': 'Battery Jump-start',
                'description': 'Get your car running again with our battery jump-start service. We\'ll safely jump-start your vehicle and ensure it\'s running properly.',
                'price': 45.00,
                'duration': 15,
                'icon': 'battery'
            },
            {
                'name': 'Fuel Delivery',
                'description': 'Emergency fuel delivery when you\'re stranded. We\'ll bring enough fuel to get you to the nearest gas station.',
                'price': 35.00,
                'duration': 20,
                'icon': 'fuel'
            },
            {
                'name': 'Towing Service',
                'description': 'Professional towing service to your preferred destination. We handle all types of vehicles safely and efficiently.',
                'price': 120.00,
                'duration': 60,
                'icon': 'truck'
            },
            {
                'name': 'Lockout Assistance',
                'description': 'Help when you\'re locked out of your vehicle. Our technicians can safely unlock your car without causing damage.',
                'price': 55.00,
                'duration': 15,
                'icon': 'key'
            },
            {
                'name': 'Emergency Repairs',
                'description': 'Minor roadside repairs to get you back on the road. We can handle various mechanical issues on-site.',
                'price': 95.00,
                'duration': 45,
                'icon': 'wrench'
            }
        ]

        for service_data in services_data:
            service, created = Service.objects.get_or_create(
                name=service_data['name'],
                defaults=service_data
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully created service: {service.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Service already exists: {service.name}')
                )

        self.stdout.write(
            self.style.SUCCESS('Successfully set up all services!')
        ) 