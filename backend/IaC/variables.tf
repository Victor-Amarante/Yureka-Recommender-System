variable "instance_type" {
  description = "Tipo da instância EC2"
  type        = string
  default     = "t3.micro"
}

variable "region" {
  description = "Região da AWS"
  type        = string
  default     = "sa-east-1"
}

variable "public_key_path" {
  description = "Caminho para a chave pública SSH"
  type        = string
  default     = "~/.ssh/yureka.pub"
}

variable "private_key_path" {
  description = "Caminho para a chave privada SSH"
  type        = string
  default     = "~/.ssh/yureka"
}

variable "key_name" {
  description = "Nome do par de chaves SSH"
  type        = string
  default     = "yureka-key"
}

variable "ami_id" {
  description = "ID da AMI a ser usada na EC2"
  type        = string
  default     = "ami-0f9ae750e8274075b" # Exemplo para Ubuntu Server 22.04 LTS (sa-east-1)
}

variable "docker_stack_file" {
  description = "Caminho do arquivo Docker Stack"
  type        = string
  default     = "/home/ubuntu/yureka/backend/docker-stack.yml"
}
