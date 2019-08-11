import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './style.scss'

import ProgressBarPatient from 'components/ProgressBarPatient'
import { push } from 'react-router-redux'
import moment from 'moment-timezone'
import { setPatient } from 'redux/patient/action'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');


export class AppointmentScheduled extends Component {
    componentWillMount() {
        const page = window.location.pathname + window.location.search;
        /* gets the Patient data from redux though props */
        const patient = this.props.patient
        //console.log(this.props.location.query.event_start_time)
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }
        // page protection
        if(this.props.location){
          const params = new URLSearchParams(this.props.location.search);
          const fromCalendly = params.get('event_start_time');

          if ((!this.props.patient.appointment || this.props.cmr.complete) && !fromCalendly) {
            this.props.push('/')
          }
          if(fromCalendly){
            patient.appointment = fromCalendly
            this.props.setPatient(patient)
          }
      }
    }
    getTimes = () => {
        let appointment
        const params = new URLSearchParams(this.props.location.search);
        const fromCalendly = params.get('event_start_time');
        if (fromCalendly){
           appointment   = fromCalendly//.substr(0, this.props.patient.appointment.length - 3)

        }else{
           appointment = this.props.patient.appointment//.substr(0, this.props.patient.appointment.length - 3)
        }

        // check whether its a jest test or not
        if (this.props.jestTest) {
            return moment(appointment).tz('UTC').format("MMMM Do [at] h:mma z")
        }
        // generate the time into desire format with the moment lib.
        return moment(appointment).tz(moment.tz.guess()).format("MMMM Do [at] h:mma z")
    }
    render() {
        return (
            <div className={style.content}>
                <p className={style.titleName}>
                    {this.props.user.firstName}, our pharmacist will call you on
                </p>
                <p className={style.scheduledDate}>
                    {this.getTimes()}
                </p>
                <div className={style.text}>
                    <p>
                        <strong>What You Can Expect</strong>
                    </p>
                    <p>
                        Our pharmacist will review all of your medications—including prescriptions, over-the-counter drugs, herbals and supplements—to help identify any drug-related problems you may be experiencing
                    </p>
                    <p>
                        <strong>On the Call</strong>
                    </p>
                    <p>
                        Our pharmacist will answer any questions you may have about your medications, and will also be looking for ways to reduce your prescription costs and improve your health. They will provide you with recommendations that are specific to you, and will follow up with your doctor as well.
                    </p>
                    <p>
                        <strong>
                            How do I Change My Appointment Time and Date?
                        </strong>
                    </p>
                    <p> 
                        To change the time and date of your pharmacist call, just call us at <strong>{process.env.ARINE_PHONE}</strong>.
                    </p>
                    <p>
                        <strong>Anything Else?</strong>
                    </p>
                    <p>
                        Ask questions! Our pharmacists are here to serve you. There is no additional cost for this service, and the more we know about you, the more we can help!
                    </p>
                    <p>
                        <strong>
                            What Happens After the Appointment?
                        </strong>
                    </p>
                    <p>
                        After the call, our pharmacist will prepare two reports for you: a personalized medication list, and a medication action plan. These reports will be visible to you any time you log into the Arine portal.
                    </p>
                </div>
                <span className={style.footerWrapper}>
                    <ProgressBarPatient step={5} />
               </span>
            </div>
        )
    }
}

export default connect (
    ({ user, patient, cmr }) => ({ user, patient, cmr }),
    { setPatient,push }
)(AppointmentScheduled)
