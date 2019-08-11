pipeline {
  agent any
  environment {
    CI = 'true'
  }
  tools {
    nodejs "Jenkins Node"
  }
  stages {
    stage('Test'){
      steps {
        sh 'bash ./scripts/setup.sh'
        sh 'bash ./scripts/test.sh'
      }
    }

    stage('Acceptance Test'){
      steps {
        wrap([$class: 'Xvfb']) {
          sh "robot robot_test"
          step([$class: 'RobotPublisher',
            disableArchiveOutput: false,
            logFileName: 'log.html',
            otherFiles: '',
            outputFileName: 'output.xml',
            outputPath: '.',
            passThreshold: 100,
            reportFileName: 'report.html',
            unstableThreshold: 0]);
        }
      }
    }

    stage('Deploy'){
      steps {
        sh 'bash ./scripts/build.sh'
      }
    }

    stage('Cleanup'){
      steps {
        echo 'Prune and Cleanup'
        sh 'bash ./scripts/cleanup.sh'
      }
    }
  }
}
