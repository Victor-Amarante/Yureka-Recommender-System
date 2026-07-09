from django.core.management.base import BaseCommand
from django.utils import timezone
from yureka.models import Topic, Channel, Video, CuratedVideo, VideoTopic


TOPICS = [
    ("Programação", "Linguagens, frameworks, algoritmos e desenvolvimento de software"),
    ("Design", "UI/UX, tipografia, cores e ferramentas de design"),
    ("Produtividade", "Técnicas, sistemas e ferramentas para ser mais produtivo"),
    ("Matemática", "Matemática pura, aplicada e visualizações"),
    ("Ciência", "Física, biologia, química e ciências em geral"),
    ("Idiomas", "Aprendizado de línguas estrangeiras"),
    ("Negócios", "Empreendedorismo, marketing e gestão"),
    ("Saúde", "Bem-estar, exercícios e nutrição"),
]

CHANNELS = [
    {
        "id": "UCsBjURrPoezykLs9EqgamOA",
        "name": "Fireship",
        "about": "High-intensity code tutorials and tech news",
        "image_url": "https://yt3.googleusercontent.com/ytc/AIdro_msDFKQ_1i7mqfGxNHr8Kn3G0v9mU2tLRc3h5vL=s176-c-k-c0x00ffffff-no-rj",
        "subscribers": 2800000,
    },
    {
        "id": "UCVHFbw7woebKtffq1yfaP6w",
        "name": "Código Fonte TV",
        "about": "Conteúdo de programação e tecnologia em português",
        "image_url": "https://yt3.googleusercontent.com/ytc/AIdro_nPVdWCm7aEhOhgCR1jBMBGXPW4bXa3iXuVAQ=s176-c-k-c0x00ffffff-no-rj",
        "subscribers": 520000,
    },
    {
        "id": "UCYO_jab_esuFRV4b17AJtAg",
        "name": "3Blue1Brown",
        "about": "Animações matemáticas que constroem intuição geométrica",
        "image_url": "https://yt3.googleusercontent.com/ytc/AIdro_lNEj5L1LMv-PHGG3jFVbdm3O6ULJKJGkQS0A=s176-c-k-c0x00ffffff-no-rj",
        "subscribers": 5600000,
    },
]

# (youtube_id, title, duration_seconds, views, channel_id, topics_indices)
VIDEOS = [
    ("rHIkrotSwcc", "Python in 100 Seconds", 113, 3200000, "UCsBjURrPoezykLs9EqgamOA", [0]),
    ("Mus_vwhS6zY", "JavaScript in 100 Seconds", 120, 2800000, "UCsBjURrPoezykLs9EqgamOA", [0]),
    ("DC471a9qrU4", "React in 100 Seconds", 107, 2500000, "UCsBjURrPoezykLs9EqgamOA", [0]),
    ("eIho2S0ZahI", "Django in 100 Seconds", 100, 1100000, "UCsBjURrPoezykLs9EqgamOA", [0]),
    ("aircAruvnKk", "But what is a neural network?", 1003, 13000000, "UCYO_jab_esuFRV4b17AJtAg", [3, 4]),
    ("WUvTyaaNkzM", "The essence of calculus", 1068, 9500000, "UCYO_jab_esuFRV4b17AJtAg", [3]),
    ("spUNpyF58BY", "Linear algebra - Chapter 1", 898, 7000000, "UCYO_jab_esuFRV4b17AJtAg", [3]),
    ("VpTW03a0AZY", "O que é e como funciona o Tailwind CSS?", 780, 180000, "UCVHFbw7woebKtffq1yfaP6w", [0, 1]),
    ("rfscVS0vtbw", "Learn Python - Full Course for Beginners", 16542, 34000000, "UCsBjURrPoezykLs9EqgamOA", [0]),
    ("vAgPJXQMnZU", "Design Principles: Visual Perception", 540, 420000, "UCsBjURrPoezykLs9EqgamOA", [1]),
]


class Command(BaseCommand):
    help = "Popula o banco com tópicos, canais, vídeos e vídeos curados para desenvolvimento"

    def handle(self, *args, **options):
        self.stdout.write("Criando tópicos...")
        topic_objects = []
        for name, description in TOPICS:
            obj, created = Topic.objects.get_or_create(name=name, defaults={"description": description})
            topic_objects.append(obj)
            if created:
                self.stdout.write(f"  + {name}")

        self.stdout.write("Criando canais...")
        for ch in CHANNELS:
            _, created = Channel.objects.get_or_create(id=ch["id"], defaults={
                "name": ch["name"],
                "about": ch["about"],
                "image_url": ch["image_url"],
                "subscribers": ch["subscribers"],
            })
            if created:
                self.stdout.write(f"  + {ch['name']}")

        self.stdout.write("Criando vídeos e curadoria...")
        for yt_id, title, duration, views, channel_id, topic_indices in VIDEOS:
            video, created = Video.objects.get_or_create(id=yt_id, defaults={
                "title": title,
                "thumbnail": f"https://img.youtube.com/vi/{yt_id}/hqdefault.jpg",
                "duration": duration,
                "views": views,
                "channel_id": channel_id,
                "publication_date": timezone.now(),
            })
            if created:
                self.stdout.write(f"  + {title}")

            curated, _ = CuratedVideo.objects.get_or_create(
                video=video,
                defaults={"approved_at": timezone.now()}
            )
            for idx in topic_indices:
                VideoTopic.objects.get_or_create(video=curated, topic=topic_objects[idx])

        self.stdout.write(self.style.SUCCESS(
            f"\nSeed concluído: {len(TOPICS)} tópicos, {len(CHANNELS)} canais, {len(VIDEOS)} vídeos."
        ))
