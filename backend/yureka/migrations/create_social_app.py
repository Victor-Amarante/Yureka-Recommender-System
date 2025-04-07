from django.db import migrations
from django.conf import settings

def create_social_app(apps, schema_editor):
    Site = apps.get_model('sites', 'Site')
    SocialApp = apps.get_model('socialaccount', 'SocialApp')
    
    # Criar ou atualizar o site
    site, _ = Site.objects.get_or_create(
        id=settings.SITE_ID,
        defaults={
            'domain': 'localhost:8000',
            'name': 'localhost'
        }
    )

    # Criar o social app para Google (ajuste conforme seu provider)
    social_app, created = SocialApp.objects.get_or_create(
        provider='google',
        name='Google',
        defaults={
            'client_id': settings.SOCIALACCOUNT_PROVIDERS['google']['APP']['client_id'],
            'secret': settings.SOCIALACCOUNT_PROVIDERS['google']['APP']['secret'],
        }
    )

    if created:
        social_app.sites.add(site)

class Migration(migrations.Migration):
    dependencies = [
        ('sites', '0002_alter_domain_unique'),
        ('socialaccount', '0003_extra_data_default_dict'),
        # Adicione sua última migração aqui
        ('yureka', 'XXXX_previous_migration'),
    ]

    operations = [
        migrations.RunPython(create_social_app),
    ] 