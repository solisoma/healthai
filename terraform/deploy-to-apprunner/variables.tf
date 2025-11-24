variable "app_name" {
  description = "App Runner service name"
  type        = string
  default     = "healthcare-app"
}

variable "app_port" {
  description = "Port the application listens on"
  type        = string
  default     = "3000"
}

variable "start_command" {
  description = "Command to start the application"
  type        = string
  default     = "sh -c \"uvicorn api.index:app --host 0.0.0.0 --port 8000 & npm start\""
}

variable "clerk_publishable_key" {
  description = "Clerk publishable key"
  type        = string
  sensitive   = true
}

variable "clerk_secret_key" {
  description = "Clerk secret key"
  type        = string
  sensitive   = true
}

variable "clerk_jwks_url" {
  description = "Clerk JWKs URL"
  type        = string
  sensitive   = true
}

variable "openai_api_key" {
  description = "OpenAI API key"
  type        = string
  sensitive   = true
}

variable "backend_url" {
  description = "Backend URL for internal communication"
  type        = string
  default     = "http://localhost:8000"
}

variable "instance_cpu" {
  description = "CPU units"
  type        = string
  default     = "0.5 vCPU"
}

variable "instance_memory" {
  description = "Memory"
  type        = string
  default     = "1 GB"
}

variable "health_check_path" {
  description = "Health check path"
  type        = string
  default     = "/api/health"
}

variable "health_check_interval" {
  description = "Health check interval in seconds"
  type        = number
  default     = 10
}

variable "health_check_timeout" {
  description = "Health check timeout in seconds"
  type        = number
  default     = 5
}