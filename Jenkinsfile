pipeline {
  agent any
  environment {
    IMAGE_NAME = "sample-app"
    IMAGE_TAG = "${env.GIT_COMMIT.take(7)}"
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install & Test') {
      steps {
        sh 'node --version || true'
        sh 'npm ci'
        sh 'npm test'
      }
    }
    stage('Build Docker Image') {
      steps {
        script {
          // Build image using host docker
          sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
          sh "docker images | grep ${IMAGE_NAME} || true"
        }
      }
    }
  }
  post {
    success {
      echo "Pipeline succeeded. Built ${IMAGE_NAME}:${IMAGE_TAG}"
    }
    failure {
      echo "Pipeline failed."
    }
  }
}
