# **Guia de Build - Yureka Recommender System**

Este documento contém as instruções para construir e executar o sistema localmente. Siga os passos abaixo para garantir um ambiente configurado corretamente. 🚀

---

## **1. Pré-requisitos**
Antes de iniciar a configuração, certifique-se de ter os seguintes softwares instalados:
- **Python 3.x**
- **PostgreSQL**
- **Virtualenv** (opcional, mas recomendado)
- **Node.js** e **npm** (para o frontend)
- **Git**

---

## **2. Configuração do Backend (Django Rest Framework)**

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio/backend
   ```

2. **Crie um ambiente virtual e ative-o:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   ```

3. **Instale as dependências:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto e preencha com as configurações necessárias (baseado no `.env.example`).

5. **Execute as migrações do banco de dados:**
   ```bash
   python manage.py migrate
   ```

6. **Inicie o servidor do backend:**
   ```bash
   python manage.py runserver
   ```
   O backend estará disponível em `http://127.0.0.1:8000/`.

---

## **3. Configuração do Frontend (ReactJS)**

1. **Acesse a pasta do frontend:**
   ```bash
   cd ../frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor do frontend:**
   ```bash
   npm start
   ```
   O frontend estará disponível em `http://localhost:3000/`.

---

## **4. Rodando os Testes**
### **Backend**
Para rodar os testes do backend:
```bash
python manage.py test
```

### **Frontend**
Para rodar os testes do frontend:
```bash
npm test
```

---

Agora seu ambiente está pronto! 🎉 Caso tenha dúvidas, consulte a documentação ou abra uma issue no repositório. 🚀
