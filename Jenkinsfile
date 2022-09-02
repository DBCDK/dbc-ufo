#!groovy​

properties([
        buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '10')),
        pipelineTriggers([]),
        disableConcurrentBuilds()
])

def PRODUCT = "ufo"
def DOCKER_REPO = "docker-fbiscrum.artifacts.dbccloud.dk"

def BRANCH = BRANCH_NAME.toLowerCase().replaceAll(/[\/._ ]/, "-")
def CONTAINER_NAME = "${PRODUCT}-${BRANCH}"
def DOCKER_NAME = "${DOCKER_REPO}/${CONTAINER_NAME}:${BUILD_NUMBER}"
def DOCKER_STATUS = ''
pipeline {
    agent {
        label 'devel10-head'
    }
    stages {
        stage('Test and build image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_NAME --pull --no-cache ."
                }
            }
        }
        stage('Run docker') {
            steps {
                script {
                    sh """
                        docker run --env-file test.env -p 8030:8030 --name=$CONTAINER_NAME $DOCKER_NAME &
                        # Wait for 10 seconds for the container to be set up correct before the test
                        sleep 10
                    """
                }
            }
        }
        stage ('Check container is running correct') {
            when {
                branch "master"
            }
            steps {
                script {
                    DOCKER_STATUS = sh (
                        script: "docker exec $CONTAINER_NAME /bin/bash -c \"curl -I http://localhost:8030/login | grep HTTP | cut -d ' ' -f2\"",
                        returnStdout: true
                    ).trim()
                    // If DOCKER_STATUS == 200, then there is a working webpage and all is well
                    if (DOCKER_STATUS == "200") {
                        echo "Succes"
                    } else {
                        echo "Build failed"
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
        stage('Push to Artifactory') {
            when {
                branch "master"
            }
            steps {
                script {
                    if (currentBuild.resultIsBetterOrEqualTo('SUCCESS')) {
                        docker.image("${DOCKER_NAME}").push("${BUILD_NUMBER}")
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                sh """
                    echo Hello
                    docker kill $CONTAINER_NAME
                    docker rm $CONTAINER_NAME
                    docker rmi $DOCKER_NAME
                """
            }
        }
    }
}