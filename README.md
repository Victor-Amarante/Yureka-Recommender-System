Yureka - YouTube Recommendation Engine for Knowledge and Activity
---

## **Descrição do Projeto**  
Este projeto é uma plataforma que faz a curadoria automática de vídeos do YouTube com base nos interesses e rotina dos usuários. Ele coleta vídeos periodicamente, processa-os utilizando embeddings e recomenda os melhores conteúdos no momento ideal para cada usuário.  


## **Objetivos Principais**  
- Permitir que os usuários escolham seus tópicos de interesse.  
- Coletar vídeos do YouTube automaticamente a cada 3 horas.  
- Processar vídeos usando embeddings para encontrar os mais relevantes.  
- Recomendar vídeos com base na rotina e preferências do usuário.  
- Monitorar métricas como retenção de vídeos e tempo de uso do app.  
- Bloquear canais indesejados através de uma blacklist.  

## **Funcionalidades Esperadas**  
✅ Cadastro via login
✅ Seleção de tópicos de interesse pelo usuário  
✅ Definição da rotina do usuário (horários e tipos de vídeos por período)  
✅ Curadoria automática de vídeos (coleta, embeddings, filtro por relevância)  
✅ Exibição de vídeos recomendados com base na rotina  
✅ Coleta de métricas (tempo assistido, retenção, troca de vídeos)  
✅ Blacklist para canais indesejados 


## **Arquitetura do Sistema**  
O sistema é dividido em três principais componentes:  

1. **Backend** (Python/Django (utilizando o Django Rest Framework), banco de dados relacional, banco de dados vetorial)  
2. **Frontend** (ReactJS)

## **Tecnologias Utilizadas**
- **Linguagem**: Python 3.x
- **Framework**: Django
- **Banco de Dados**: PostgreSQL
- **Armazenamento de Embeddings**: Redis ou similar
- **Autenticação**: Social Login (OAuth com Google, Facebook, etc.)
- **Integração com YouTube API**: Para busca e coleta de vídeos

## **Estrutura do Código**
```
backend/
├── manage.py              # Comando principal do Django
├── requirements.txt       # Dependências do projeto
├── core/                  # Configurações principais do Django
│   ├── settings.py        # Configurações gerais do projeto
│   ├── urls.py            # Rotas principais do backend
│   ├── asgi.py / wsgi.py  # Interfaces do servidor
├── yureka/                # Aplicação principal
│   ├── admin.py           # Configuração do Django Admin
│   ├── models.py          # Modelos de banco de dados
│   ├── views.py           # Lógica das requisições HTTP
│   ├── adapters/          # Comunicação com o mundo externo (HTTP, APIs, etc.)
│   │   ├── http/          # Adaptadores para requisições HTTP
│   │   ├── serializers/   # Serialização de dados
│   ├── application/       # Casos de uso da aplicação
│   ├── domain/            # Regras de negócio
│   │   ├── models/        # Modelos do domínio
│   │   ├── repository/    # Interface para repositórios de dados
│   │   ├── service/       # Serviços do domínio
│   ├── infrastructure/    # Implementações técnicas (banco de dados, cache, etc.)
│   ├── migrations/        # Migrações do Django
│   ├── ports/             # Interfaces para comunicação entre camadas
│   │   ├── command/       # Comandos da aplicação
│   │   ├── use_cases/     # Casos de uso específicos
```

## **Como Rodar o Backend Localmente**
### **Pré-requisitos**
- Python 3.x instalado
- PostgreSQL instalado
- Virtualenv instalado (opcional, mas recomendado)

## **Como Rodar o Backend Localmente**
### **Pré-requisitos**
- Python 3.x instalado
- PostgreSQL instalado
- Virtualenv instalado (opcional, mas recomendado)

### **Passos**
1. Clone o repositório e acesse a pasta do backend:
   ```bash
   git clone https://github.com/seu-usuario/Yureka-Recommender-System.git
   cd seu-repositorio/backend
   ```
2. Crie um ambiente virtual e instale as dependências:
   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Execute as migrações do banco de dados:
   ```bash
   python manage.py migrate
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
   python manage.py runserver
   ```
6. O backend estará rodando em `http://127.0.0.1:8000/`.

## **Como Rodar os Testes**
1. Execute os testes automatizados com o comando:
   ```bash
   python manage.py test
   ```

## **Contribuindo para o Backend**
- Siga o padrão de código definido no projeto.
- Faça **Pull Requests** com descrições detalhadas das mudanças.
- Certifique-se de rodar os testes antes de enviar qualquer alteração.

## **Links Importantes**
- [Documentação oficial do Django Rest Framework](https://www.django-rest-framework.org/)
- [Documentação oficial do ReactJS](https://reactjs.org/)
- [Documentação oficial do PostgreSQL](https://www.postgresql.org/docs/)
- [Documentação oficial do Node.js](https://nodejs.org/en/docs/)

## Autores 👥
| <a href="https://github.com/Victor-Amarante"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/102763898?v=4" width="120px;" alt="Eric"/></a> | <a href="https://github.com/eliseucbrito/"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/78649484?v=4" width="120px;" alt="Amarante"/></a> |
| :----: | :----: |
| [Victor Amarante - Backend](https://github.com/Victor-Amarante/) | [Eliseu C. Brito - Frontend](https://github.com/eliseucbrito) |