pipeline {
    agent any
	environment {
		NEW_VERSION = '1.3.0'
	}
    stages {
        stage("build") {
            steps {
                echo "building app version ${NEW_VERSION}..."
				discordSend description: "Jenkins Pipeline Build Started", footer: env.RUN_DISPLAY_URL, link: env.BUILD_URL, title: JOB_NAME, webhookURL: "https://discord.com/api/webhooks/1024040084657406103/jxb8AgGzRZUdwmLK0xUyDr0199v-_QDbZBvRuDzagCjfmEyQ2dcQA5rDFOZnzWHM-t8J"
            }
        }
        stage("test") {
			when {
				expression {
					BRANCH_NAME == 'dev'
				}
			}
            steps {
                echo 'testing app...'
            }
        }
        stage("deploy") {
            steps {
                echo 'deploying app...'
            }
        }
    }
	post {
		success {
			discordSend description: "Jenkins Pipeline build successful", footer: 'the current build has finished and can be pushed', link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discord.com/api/webhooks/1024040084657406103/jxb8AgGzRZUdwmLK0xUyDr0199v-_QDbZBvRuDzagCjfmEyQ2dcQA5rDFOZnzWHM-t8J"
		}
	}
}