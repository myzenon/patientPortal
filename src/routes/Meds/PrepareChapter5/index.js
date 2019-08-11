import React, { Component, Fragment } from 'react'
import { Container, Button, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import style from './style.scss'
import { connect } from 'react-redux'
import ProgressBarPatient from 'components/ProgressBarPatient'
import { savePageData } from 'redux/page/action'
import HeartBeat from '../../../assets/health-bg-icon.svg'

import moment from 'moment-timezone'

//import JSON

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');

export  class PrepareChapter5 extends Component {

    componentWillMount() {
        //set the state of the progress ProgressBarPatient
        this.props.savePageData({
            ShowProgressStep: 5
          })
        const patient = this.props.patient
        this.patient = patient
        let patientName = ''
        let patientEmail = ''
        let patientPhone = ''

        patient.telecom.forEach((telecome) => {
            if (telecome.system === 'email') {
                patientEmail = telecome.value
            }
            if (telecome.system === 'phone') {
                patientPhone = telecome.value
            }
        })
        //check logind in user = patient if not use username with patient name
        //the logged in user is a caregiver add their name to the appointment

        if (this.props.user && !(this.props.user.patientId === undefined) && this.props.user.patientId == this.props.patient.id){
          patientName = this.props.patient.name[0].given + "%20" + this.props.patient.name[0].family
        }else{
          patientName = this.props.user.firstName + "%20" + this.props.user.lastName + "(on behalf of " +  this.props.patient.name[0].given + "%20" + this.props.patient.name[0].family +")"
        }
        this.setState({patientName})

        /* if there is no email for the patient use the email/login of the logged in user */
        patientEmail = patientEmail ? patientEmail : ( this.props.user.email ? this.props.user.email : '')
        this.setState({patientEmail})
        this.setState({patientPhone})

        const page = window.location.pathname + window.location.search;

        console.log("Server:  " + process.env.NODE_ENV);
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);

            //get the current chapter starting time from page data
            var startTime = this.props.page.data.chapter4Time;
            //current time, it gives the ending time of the previous chapter
            var currentTime = Date.now();
            //if start time avaliable, find the difference. it gives the total time spent on current chapter
            if(startTime) {
                var diff = currentTime - startTime;

                //generate the timing event to GA
                ReactGA.timing({
                    category: 'Registration',
                    variable: 'Chapter-4',
                    value: diff, // in milliseconds
                    label: 'Total Time'
                });
            }
        }
    }

    getTimes = () => {
        const appointment = this.props.patient.appointment//.substr(0, this.props.patient.appointment.length - 3)
        // check whether its a jest test or not
        if (this.props.jestTest) {
            return moment(appointment).tz('UTC').format("MMMM Do [at] h:mma z")
        }
        // generate the time into desire format with the moment lib.
        return moment(appointment).tz(moment.tz.guess()).format("MMMM Do [at] h:mma z")
    }

    render() {
        return (
            <Fragment>
                 <Container fluid className= {style.mainBodyPosition}>

                    <Row>
                        <Col className={style.headerBackground}>
                            <div className={style.mainHeader}>
                                <strong>
                                    <h1 className={style.heading}> Congratulations! You've answered all our questions.</h1>
                                    <span>Click Next will take you back to the Arine landing page where you can review your answer.</span>
                                </strong>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col className={style.buttonInputWrapper}>
                            <div className={style.buttonWrapper}>
                                { (this.props.patient.appointment == undefined)?
                                    <a href={(process.env.NODE_ENV == 'production' ?
                                                    ("https://calendly.com/pharmacists/cmr?name="):
                                                    ("https://calendly.com/dev-pharmacists/cmr?name=") )
                                            + this.state.patientName + "&a1="+ this.props.patient.id + "&email=" + this.state.patientEmail + "&a2=+1"+ this.state.patientPhone.replace(/-/g, '')} >
                                            <Button className = {[style.btn, style.btnNext, style.customBtnNext, style.callIcon]}>
                                                SCHEDULE YOUR APPOINTMENT
                                            </Button>
                                        </a>
                                    :
                                    <p className={style.scheduledDate}>
                                        Pharmacist call scheduled on {this.getTimes()}
                                    </p>
                                }
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className={style.videoContainer}>
                                <video  className={style.video}
                                        controls
                                        //  autoPlay
                                        src="https://s3.amazonaws.com/arine-content-public/web-site/video/review_complete_v1.mov" />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className={style.scheduleText}>
                                <p> If you would like to schedule your phone call with one of our pharmacists, you can click the link above
                                and choose a date and time that works for you. Otherwise, we will call you in the next couple of days to schedule a call.
                                You can also call us anytime at <span>{process.env.ARINE_PHONE}. </span></p>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col className={style.buttonInputWrapper}>
                            <div className={style.reviewButtonWrapper}>
                                <Link to='/landing-page'>
                                    <Button className = {[style.btn, style.btnNext, style.customBtnNext]}>
                                        REVIEW MY ANSWERS
                                    </Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>

                </Container>


            </Fragment>



        )
    }
}

export default connect(
    ({
        page,
        cmr,
        patient,
        user
    }) => ({
        page,
        cmr,
        patient,
        user
        }),
    {
        savePageData
     }
)(PrepareChapter5)
