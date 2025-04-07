#!/bin/bash

# Sair imediatamente se um comando falhar
set -e

# --- Configurações ---
TF_DIR="./IaC" # Ajuste para o caminho da sua pasta Terraform
VAR_FILE=""    # Deixe em branco ou defina o caminho para um .tfvars (ex: "environments/prod.tfvars")

# --- Verificação de Dependências ---
echo "[INFO] Verificando dependências (AWS CLI e Terraform)..."
if ! command -v aws &> /dev/null; then
    echo "[ERRO] AWS CLI não encontrado. Por favor, instale-o."
    echo "Veja: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi
if ! command -v terraform &> /dev/null; then
    echo "[ERRO] Terraform não encontrado. Por favor, instale-o."
    echo "Veja: https://learn.hashicorp.com/tutorials/terraform/install-cli"
    exit 1
fi
echo "[OK] Dependências encontradas."
echo ""

# --- Configuração/Verificação de Credenciais AWS ---
echo "[INFO] Verificando credenciais AWS..."

# Prioriza variáveis de ambiente (ideal para CI/CD)
if [ -n "$AWS_ACCESS_KEY_ID" ] && [ -n "$AWS_SECRET_ACCESS_KEY" ] && [ -n "$AWS_REGION" ]; then
    echo "[OK] Credenciais AWS encontradas via variáveis de ambiente."
    # AWS CLI usará automaticamente essas variáveis
elif aws sts get-caller-identity &> /dev/null; then
    # Verifica se já existe uma configuração válida (ex: via ~/.aws/credentials ou role IAM)
    echo "[OK] Credenciais AWS válidas encontradas (configuração existente ou role IAM)."
else
    echo "[AVISO] Nenhuma credencial AWS válida encontrada (variáveis de ambiente ou configuração existente)."
    echo "Tentando configuração interativa..."

    # Prompt para credenciais (Fallback Interativo)
    read -p "Digite sua AWS Access Key ID: " access_key_id
    # `-s` esconde a digitação da chave secreta
    read -sp "Digite sua AWS Secret Access Key: " secret_access_key
    echo # Nova linha após input secreto
    read -p "Digite sua Região AWS padrão (ex: us-east-1, sa-east-1): " default_region

    if [ -z "$access_key_id" ] || [ -z "$secret_access_key" ] || [ -z "$default_region" ]; then
        echo "[ERRO] Credenciais ou região não fornecidas. Abortando."
        exit 1
    fi

    # Configurar usando AWS CLI (sobrescreve o perfil 'default')
    aws configure set aws_access_key_id "$access_key_id" --profile default
    aws configure set aws_secret_access_key "$secret_access_key" --profile default
    aws configure set region "$default_region" --profile default

    # Limpar variáveis do script (boa prática)
    unset access_key_id
    unset secret_access_key
    unset default_region

    echo "[OK] Credenciais AWS configuradas interativamente para o perfil 'default'."
    echo "[AVISO] As credenciais foram salvas em ~/.aws/credentials. Manuseie com cuidado."
    # Tenta limpar o comando `read` do histórico (pode não funcionar em todos os shells)
    history -d $(history 1) > /dev/null 2>&1 || true
fi
echo ""

# --- Navegação para o Diretório Terraform ---
echo "[INFO] Navegando para o diretório Terraform: $TF_DIR"
if [ ! -d "$TF_DIR" ]; then
    echo "[ERRO] Diretório Terraform '$TF_DIR' não encontrado."
    exit 1
fi
cd "$TF_DIR"
echo "[OK] Dentro de $(pwd)"
echo ""

# --- Execução do Workflow Terraform ---
echo "[INFO] Iniciando workflow Terraform..."

# 1. Inicializar o Terraform
echo "[RUN] terraform init"
terraform init -input=false -backend-config=key=path/to/your/statefile.tfstate # Adapte se usar backend S3
echo ""

# 2. Validar a configuração
echo "[RUN] terraform validate"
terraform validate
echo ""

# 3. Planejar as mudanças
echo "[RUN] terraform plan"
PLAN_ARGS="-out=tfplan -input=false"
if [ -n "$VAR_FILE" ]; then
    if [ -f "$VAR_FILE" ]; then
        echo "[INFO] Usando arquivo de variáveis: $VAR_FILE"
        PLAN_ARGS="$PLAN_ARGS -var-file=$VAR_FILE"
    else
        echo "[AVISO] Arquivo de variáveis '$VAR_FILE' não encontrado. Ignorando."
    fi
fi
terraform plan $PLAN_ARGS
echo ""

# 4. Revisão e Confirmação para Aplicar (PASSO MANUAL IMPORTANTE!)
echo "--- Plano Terraform Gerado (tfplan) ---"
echo "Revise o plano acima cuidadosamente."
# Opcional: Mostrar o plano novamente para clareza
# terraform show tfplan

read -p "Deseja APLICAR este plano? (Digite 'yes' para confirmar): " apply_confirm
if [[ "$apply_confirm" != "yes" ]]; then
    echo "[INFO] Aplicação cancelada pelo usuário."
    # Opcional: Limpar o plano salvo se não for aplicar
    # rm tfplan
    exit 0
fi

# 5. Aplicar as mudanças
echo "[RUN] terraform apply"
# Usar -input=false porque o tfplan já foi gerado e aprovado
terraform apply -input=false tfplan

# Opcional: Limpar o plano após aplicação bem-sucedida
rm tfplan

echo ""
echo "[OK] Workflow Terraform concluído com sucesso!"

# Opcional: Voltar ao diretório original
# cd - > /dev/null

exit 0
