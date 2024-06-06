variable "app_name" {
  default = "hello-world-nodejs"
}

variable "app_port" {
  default = 3000
}

variable "aws_region" {
  default = "us-east-1"
}

variable "subnet_ids" {
  type = list(string)
}

variable "security_group_ids" {
  type = list(string)
}

