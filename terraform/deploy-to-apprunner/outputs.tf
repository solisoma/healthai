output "app_runner_service_url" {
  description = "App Runner service URL"
  value       = aws_apprunner_service.healthcare_app.service_url
}

output "app_runner_service_arn" {
  description = "App Runner service ARN"
  value       = aws_apprunner_service.healthcare_app.arn
}