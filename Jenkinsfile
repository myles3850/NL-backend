pipeline {
    agent any
    stages {
        stage("build") {
            steps {
                echo 'building the app...'
				discordSend description: "Jenkins Pipeline Build ${appName}", footer: "Start Build", link: "$BUILD_URL", result: currentBuild.currentResult, title: nytelyfe-backend, webhookURL: "https://discord.com/api/webhooks/1024040084657406103/jxb8AgGzRZUdwmLK0xUyDr0199v-_QDbZBvRuDzagCjfmEyQ2dcQA5rDFOZnzWHM-t8J"
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