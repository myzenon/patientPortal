import React, { Component } from 'react'
import { Container, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import style from './style.scss'
import { savePageData } from 'redux/page/action'
import { connect } from 'react-redux'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');


export class AskedSoFarComplete extends Component {
    state = {
        medications: []
    }
    componentWillMount() {
        //set the state of the progress ProgressBarPatient
        this.props.savePageData({
            ShowProgressStep: 3
          })
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }

        const cmr = this.props.cmr
        const patient = this.props.patient
        this.cmr = cmr
        this.patient = patient
        this.buildMedicationList()
    }
    buildMedicationList = () => {
        /* loop over cmr key */
        Object.keys(this.cmr).forEach(key => {
            /* get the meds */
            if (key.includes('medication_')) {
                if (this.cmr[key].reviewCompleted) {
                    const split = key.split('_')
                    this.state.medications.push(this.cmr.medications.find(medication => medication.id === split[1]))
                }
            }
            /* get the other meds */
            if (key.includes('otherMedication_')) {
                if (this.cmr[key].reviewCompleted) {
                    this.state.medications.push(this.cmr[key])
                }
            }
        })
    }
    render() {
        return (
                <Container fluid className={style.content}>
                    <p>
                        <strong>{this.patient.name[0].given[0]}</strong>, so far you have told as about
                    </p>
                    <p className={style.amountMedsText}>
                        {this.state.medications.length}  Medicines
                    </p>
                    <div className={style.medsListWrapper}>
                        <ul>
                            {this.state.medications.map(medication => (
                                <li key={medication.display}>{medication.display}</li>
                            ))}
                        </ul>
                    </div>
                    <p className={style.buttonWrapper}>
                        <Link to="/meds-other-meds">
                            <Button className={style.button}>
                                GOT IT!
                            </Button>
                        </Link>
                    </p>
                </Container>

        )
    }
}

export default connect(
    ({
        cmr,
        patient
    }) => ({
            cmr,
            patient
        })
)(AskedSoFarComplete)
