output "ecr_repository_url" {
  description = "ECR repository URL"
  value       = aws_ecr_repository.healthcare_app.repository_url
}

output "ecr_repository_arn" {
  description = "ECR repository ARN"
  value       = aws_ecr_repository.healthcare_app.arn
}

output "ecr_repository_name" {
  description = "ECR repository name"
  value       = aws_ecr_repository.healthcare_app.name
}

output "docker_login_command" {
  description = "Command to login to ECR"
  value       = "docker login --username AWS -p $(aws ecr get-login-password --region ${var.aws_region} ) ${replace(aws_ecr_repository.healthcare_app.repository_url, "/${var.repository_name}", "")}"
}

output "docker_tag" {
  description = "Command to tag local image to ECR"
  value       = "docker tag ${var.repository_name}:latest ${aws_ecr_repository.healthcare_app.repository_url}:latest"
}

output "push_docker" {
  description = "Command to push Docker image to ECR"
  value       = "docker push ${aws_ecr_repository.healthcare_app.repository_url}:latest"
}