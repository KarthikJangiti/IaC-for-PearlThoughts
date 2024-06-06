resource "aws_ecr_repository" "example" {
  name = var.app_name
}

resource "aws_ecs_cluster" "example" {
  name = var.app_name
}

resource "aws_ecs_task_definition" "example" {
  family                   = var.app_name
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([{
    name      = var.app_name
    image     = "${aws_ecr_repository.example.repository_url}:latest"
    essential = true
    portMappings = [{
      containerPort = var.app_port
      hostPort      = var.app_port
    }]
  }])
}

resource "aws_ecs_service" "example" {
  name            = var.app_name
  cluster         = aws_ecs_cluster.example.id
  task_definition = aws_ecs_task_definition.example.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = var.security_group_ids
    assign_public_ip = true
  }
}
