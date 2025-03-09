# **Guia de Contribuição - Yureka Recommender System**

Obrigado por considerar contribuir para o Yureka Recommender System! Seguindo estas diretrizes, garantimos um desenvolvimento colaborativo eficiente e organizado. 🚀

## **1. Configuração do Ambiente de Desenvolvimento**
### **Pré-requisitos**
Antes de começar, certifique-se de ter instalado:
- **Python 3.x**
- **PostgreSQL**
- **Virtualenv** (opcional, mas recomendado)
- **Git**

### **Passos para Configuração**
1. **Clone o repositório e acesse a pasta do backend:**
   ```bash
   git clone https://github.com/seu-usuario/Yureka-Recommender-System.git
   cd seu-repositorio/backend
   ```
2. **Crie um ambiente virtual e ative-o:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   ```
3. **Instale as dependências do projeto:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` com as configurações necessárias (exemplo disponível em `.env.example`).

5. **Execute as migrações do banco de dados:**
   ```bash
   python manage.py migrate
   ```
6. **Inicie o servidor de desenvolvimento:**
   ```bash
   python manage.py runserver
   ```
   O backend estará rodando em `http://127.0.0.1:8000/`.

## **2. Processo de Submissão de Código e Revisão**
### **Fluxo de Trabalho**
1. **Crie um fork do repositório** no GitHub.
2. **Crie um novo branch** baseado na `main`:
   ```bash
   git checkout -b minha-feature
   ```
3. **Implemente suas mudanças** seguindo as diretrizes de código do projeto.
4. **Execute os testes para garantir que tudo funciona:**
   ```bash
   python manage.py test
   ```
5. **Commit suas alterações** com uma mensagem descritiva (dê preferência para usar o *Conventional Commits*):
   ```bash
   git commit -m "Adiciona funcionalidade X ao sistema"
   ```
6. **Envie o branch para o seu fork:**
   ```bash
   git push origin minha-feature
   ```
7. **Crie um Pull Request (PR)** no repositório principal e aguarde a revisão.

### **Regras para Pull Requests**
- Sempre descreva claramente a funcionalidade ou correção realizada.
- Adicione evidências (prints, logs) se necessário.
- Aguarde a revisão e esteja disponível para eventuais ajustes.

## **3. Boas Práticas de Código**
- Siga o padrão **PEP8** para formatação do código Python.
- Nomeie variáveis e funções de forma clara e descritiva.
- Documente métodos e classes sempre que possível.
- Priorize a reutilização de código e modularidade.

## **4. Dúvidas e Suporte**
Se precisar de ajuda, abra uma **issue** no repositório ou entre em contato via o canal de comunicação do projeto.

---
Agora você está pronto para contribuir! 🎉 Obrigado por fazer parte do desenvolvimento do Yureka Recommender System. 🚀
