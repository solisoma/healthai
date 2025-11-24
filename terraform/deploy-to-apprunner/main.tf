terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

provider "aws" {
  region = var.aws_region
}

# Get ECR repository URL from ECR terraform state
data "terraform_remote_state" "ecr" {
  backend = "local"
  config = {
    path = "../create-ecr/terraform.tfstate"
  }
}

# IAM Role for App Runner
resource "aws_iam_role" "app_runner_role" {
  name = "${var.app_name}-app-runner-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = ["build.apprunner.amazonaws.com", "tasks.apprunner.amazonaws.com"]
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

# Policy for App Runner to pull from ECR
resource "aws_iam_role_policy_attachment" "app_runner_ecr" {
  role       = aws_iam_role.app_runner_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSAppRunnerServicePolicyForECRAccess"
}

# App Runner Service
resource "aws_apprunner_service" "healthcare_app" {
  service_name = var.app_name

  source_configuration {
    image_repository {
      image_identifier      = "${data.terraform_remote_state.ecr.outputs.ecr_repository_url}:latest"
      image_repository_type = "ECR"
      
      image_configuration {
        port = var.app_port
        
        runtime_environment_variables = {
          NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = var.clerk_publishable_key
          CLERK_SECRET_KEY                  = var.clerk_secret_key
          NEXT_PUBLIC_IS_DOCKERIZED         = "true"
          CLERK_JWKS_URL                    = var.clerk_jwks_url
          BACKEND_URL                       = var.backend_url
          OPENAI_API_KEY                    = var.openai_api_key
          NODE_ENV                          = "production"
        }
        
        start_command = var.start_command
      }
    }
    
    authentication_configuration {
      access_role_arn = aws_iam_role.app_runner_role.arn
    }
  }

  instance_configuration {
    cpu               = var.instance_cpu
    memory            = var.instance_memory
    instance_role_arn = aws_iam_role.app_runner_role.arn
  }

  health_check_configuration {
    protocol            = "HTTP"
    path                = var.health_check_path
    interval            = var.health_check_interval
    timeout             = var.health_check_timeout
    healthy_threshold   = 1
    unhealthy_threshold = 1
  }
}