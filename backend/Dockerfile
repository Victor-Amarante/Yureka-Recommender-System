FROM python:3.9-slim AS build

RUN apt-get update && apt-get install -y build-essential libpq-dev

WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

FROM python:3.9-slim

WORKDIR /app

COPY --from=build /app /app

ENV DJANGO_SETTINGS_MODULE=core.settings.production
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
