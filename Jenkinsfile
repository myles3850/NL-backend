pipeline {
    agent any
    stages {
        stage("build") {
            steps {
                echo 'building the app...'
				discordSend description: "Jenkins Pipeline Build Started", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discord.com/api/webhooks/1024040084657406103/jxb8AgGzRZUdwmLK0xUyDr0199v-_QDbZBvRuDzagCjfmEyQ2dcQA5rDFOZnzWHM-t8J"
            }
        }
        stage("test") {
            steps {
                echo 'testing the app...'
            }
        }
        stage("deploy") {
            steps {
                echo 'deploying the app...'
            }
        }
    }
}