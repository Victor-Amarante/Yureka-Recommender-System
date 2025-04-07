#!/bin/bash

# Atualiza pacotes
sudo apt update && sudo apt upgrade -y

# Instala dependências
sudo apt install -y docker.io docker-compose

# Habilita Docker
sudo systemctl enable docker
sudo systemctl start docker

# Inicializa o Swarm
sudo docker swarm init

# Cria diretório de deploy
mkdir -p /home/ubuntu/yureka
chown ubuntu:ubuntu /home/ubuntu/yureka

cd /home/ubuntu/yureka
docker stack deploy -c docker-stack.yml yureka  # Adicione esta linha para implantar o stack
