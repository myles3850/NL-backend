pipeline {
    agent any
    stages {
        stage("build") {
            steps {
                echo 'building app...'
				discordSend description: "Jenkins Pipeline Build Started", footer: "please await copmletion", link: env.BUILD_URL, title: JOB_NAME, webhookURL: "https://discord.com/api/webhooks/1024040084657406103/jxb8AgGzRZUdwmLK0xUyDr0199v-_QDbZBvRuDzagCjfmEyQ2dcQA5rDFOZnzWHM-t8J"
            }
        }
        stage("test") {
            steps {
                echo 'testing app...'
            }
        }
        stage("deploy") {
            steps {
                echo 'deploying app...'
            }
        }
		post {
			success {
				discordSend description: "Jenkins Pipeline build successful", footer: 'the current build has finished and can be pushed', link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discord.com/api/webhooks/1024040084657406103/jxb8AgGzRZUdwmLK0xUyDr0199v-_QDbZBvRuDzagCjfmEyQ2dcQA5rDFOZnzWHM-t8J"
			}
		}
    }
}