import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux'
import { countAmountOtherMedsCompleted, countAmountMedsCompleted, isReviewedMedsComplete, findMedNextPage, findSmartQuestionNextPage } from 'libs/utils'
import style from './style.scss'
import { push } from 'react-router-redux'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');

export class LandingPage extends Component {
    progress = []
    componentWillMount() {
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }

        // get cmr and patient from props
        const { cmr, patient } = this.props
        const progress = []

        // step 1 circle
        // Step 1 circle always shown filled in
        // display page as shown on => WF[Landing Page - CMR - Nothing Complete]
        progress[0] = {}
        progress[0].active = true
        progress[0].text = 'Account Successfully Created'
        progress[0].link = "Click to edit account info"
        progress[0].url = '/confirm-info'

        // step 2
        progress[1] = {}
        if (isReviewedMedsComplete(cmr)) {
            // Step 2 circle shown filled in
            // if step 3 not complete display page as shown on => WF[Landing Page - CMR Prescriptions Reviewed]
            // https://akesoteam.atlassian.net/wiki/spaces/PP/pages/28377135/CMR+SDK#CMRSDK-MedReviewLandingPage
            progress[1].active = true
            progress[1].text = ['You\'ve told us about', (<span key='' className={style.medsNumber}>{cmr.medications.length}</span>), 'of your Medications.']
            progress[1].link = 'Click to edit answers'
            progress[1].url  = '/prepare/Chapter2'
        }
        else {
            // Step 2 circle shown filled in
            const num_meds_completed = countAmountMedsCompleted(cmr)
            const num_meds = cmr.medications.length
            //display page as shown on => WF[Landing Page - CMR - Nothing Complete]
            progress[1].text = ['You have told us about ', (<span key='' className={style.medsNumber}>{num_meds_completed}</span>), ' of your medications.', <br />, ( <span key='1' className={style.subText}>{['There', (<span key='' className={style.medsNumber}>{num_meds - num_meds_completed == 1 ? "is": "are" }</span>), num_meds - num_meds_completed + ' more we would like to ask you about.']}</span>)]
        }

        // step 3
        progress[2] = {}
        if (cmr.otherMedsCompleted) {
           const num_othermeds_completed = countAmountOtherMedsCompleted(cmr)
            // Step 3 circle shown filled in
            // if step 4 not complete  display page as shown on WF[Landing Page - CMR OTC reviewed]
            progress[2].active = true
            progress[2].text = ['You have told us about',(<span key='' className={style.medsNumber}>{num_othermeds_completed}</span>), 'additional prescription drug(s), over the counter drug(s) and supplements you take.']
            progress[2].link = 'Click to edit answers'
            progress[2].url = '/prepare/Chapter3'
        }
        else {
            // Step 3 circle shown filled in
            // display page as shown on WF[Landing Page - CMR Prescriptions Reviewed]
            progress[2].text = [ (<span key='' className={style.subText}>We still need to hear about any additional prescription drugs, over the counter drugs and supplements you take.</span>)]
        }

        // step 4
        progress[3] = {}
        if (cmr.smartQuestionsCompleted) {
            // if step 5 not complete display page as shown on Landing Page - CMR HEDIS Completed
            progress[3].active = true
            progress[3].text = 'You have told us about your health'
            progress[3].link = 'Click to edit answers'
            progress[3].url = '/prepare-Chapter4'
        }
        else {
            progress[3].text = [ (<span key='' className={style.subText}>You haven't told us about your health.</span>)]
            // display page as shown on WF[Landing Page - CMR OTC reviewed]
        }

        //step 5
        progress[4] = {}
        if (patient.appointment){
            // if step 5 not complete display page as shown on Landing Page - CMR Appointment booked
            progress[4].active = true
            progress[4].text = 'Our pharmacist will call you on ' + moment(this.props.patient.appointment).tz(moment.tz.guess()).format("MMMM Do [at] h:mma z")
            progress[4].link = 'Click to see appointment details'
            progress[4].url = '/appointment-scheduled'
        }
        else {
            progress[4].text = [ (<span key='' className={style.subText}>You need to schedule an appointment with our pharmacist. </span>)]
            // display page as shown on WF[Landing Page - CMR HEDIS Completed]}
        }

        this.progress = progress
    }

    getTimes = () => {
        //const conversation = this.props.cmr.conversationDate.substr(0, this.props.cmr.conversationDate.length - 3)
        const conversation = this.props.cmr.conversationDate;
        // generate the time into desire format with the moment lib.
        return moment(conversation).tz(moment.tz.guess()).format("MMMM Do")
    }

    handleFinishButton = () => {
        // get cmr from props
        const { cmr } = this.props

        // next page set to appointment unless a chapter is not completed
        let nextPage = '/appointment-scheduled'

        // if step 2 [meds review] is not active
        if (!this.progress[1].active) {
            nextPage = findMedNextPage(cmr)
        }
        // if step 3 [other med] is not active
        else if (!this.progress[2].active) {
            nextPage = '/meds-other-meds'
        }
        // if step 4 [smartQuestion] is not active
        else if (!this.progress[3].active) {
            nextPage = findSmartQuestionNextPage(cmr)
        }
        // if step 5 [apppintment] is not active
        else if (!this.progress[4].active) {
            nextPage = 'prepare-Chapter5'
        }

        this.props.push(nextPage)
    }
    render() {
        return (
          <div>
          {!this.props.cmr.conversationDate ?
              <div className={style.content}>
              <br  />
                  <p>
                      <strong>{this.props.user.firstName}</strong>, you have <strong>{this.progress.length - this.progress.reduce((sum, progress) => progress.active ? sum + 1 : sum, 0)}</strong> {this.progress.length - this.progress.reduce((sum, progress) => progress.active ? sum + 1 : sum, 0) == 1 ? 'step':'steps'} remaining before your review is complete.
                  </p>
                  <div className={style.wrapper}>
                      <div className={style.line}></div>
                      {this.progress.map((progress, index) => (
                          <div key={index} className={style.progressWrapper}>
                              <div className={style.circleWrapper}>
                                  {index === 0 ? (<div className={style.circleWhiteBackground}></div>) : null}
                                  {index === this.progress.length - 1 ? (<div className={style.circleNoBackground}></div>) : null}
                                  <div className={progress.active ? style.circleActive : style.circle}>{index + 1}</div>
                                  {index === this.progress.length - 1 ? (<div className={style.circleWhiteBackground}></div>) : null}
                                  {index === 0 ? (<div className={style.circleNoBackground}></div>) : null}
                              </div>
                              <div className={style.text}>
                                  {progress.text}
                                  {progress.active ? (
                                      <Link className={style.edit} to={progress.url}>
                                          ({progress.link})
                                      </Link>
                                  ) : null}
                              </div>
                          </div>
                      ))}
                  </div>
                  <p>
                      <Button
                          className={style.button}
                          onClick={this.handleFinishButton}
                      >
                          Finish My Review
                      </Button>
                  </p>
              </div>:
              <div className={style.content}>
                <p className={style.titleName}>
                Thank you for your conversation on {this.getTimes()}. Your reports will be available here soon.
                </p>
                </div>
          }
        </div>
        )
      }
}
export default connect (
    ({
        cmr,
        patient,
        user
    }) => ({
        cmr,
        patient,
        user
    }),
    {
        push
    }
)(LandingPage)
