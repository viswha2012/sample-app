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

    // Use Docker image 'node:18' to run Install & Test in a container
    stage('Install & Test') {
      steps {
        script {
          // pulls node:18 and runs npm inside container using host docker (requires docker socket)
          docker.image('node:18').inside {
            sh 'node --version'
            sh 'npm --version'
            sh 'npm ci'
            sh 'npm test'
          }
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          // Build image on host Docker (Jenkins has /var/run/docker.sock mounted)
          sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
          sh "docker images | grep ${IMAGE_NAME} || true"
        }
      }
    }
  }
  post {
    success { echo "Built ${IMAGE_NAME}:${IMAGE_TAG}" }
    failure { echo "Pipeline failed" }
  }
}
