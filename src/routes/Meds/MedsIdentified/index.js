import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import ProgressBarPatient from 'components/ProgressBarPatient'
import style from './style.scss'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');
import { savePageData } from 'redux/page/action'

export class MedsIdentified extends Component {

    componentWillMount = () => {
        //set the state of the progress ProgressBarPatient
        this.props.savePageData({
            ShowProgressStep: 2
          })
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }

        /* gets the CMR and Patient data from redux though props */
        const cmr = this.props.cmr
        const patient = this.props.patient
        /* gets the number of length of total medications */
        const numMedsIdentified = cmr.medications.length
        this.setState({
            patientName: patient.name[0].given[0],
            numMedsIdentified: numMedsIdentified
        })
    }

    render() {
        return (
            <Container fluid>
              <div className={style.progressInfoWraper}>
              <Row><Col xs={{ size: 3}}   lg={{ size: 3, offset: 3}} md={{ size: 3, offset: 3}} sm={{ size: 3, offset: 4}}>
                  <img src={require('assets/look.png')} alt="look" width='50'/>
                  </Col>
                  </Row> <Row>
                  <Col xs={{ size: 12, offset: 2}}  lg={{ size: 2, offset: 3}}  md={{ size: 6, offset: 4}} sm={{ size: 6, offset: 5}}>
                  Click here anytime, to see the medications you have reviewed.
                  </Col></Row>
              </div>
                <Container className={style.content}>

                  <br/>
                    <p>
                        Great! Let's get Started!
                    </p>
                    <p>
                        <strong>{this.state.patientName}</strong>, based on our information we have identified
                    </p>
                    <div className={style.number}>
                        <p>
                            <strong>{this.state.numMedsIdentified}</strong>
                        </p>
                    </div>
                    <p>
                        medications we'd like to talk to you about.
                    </p>
                    <Link to={`/meds-verify-drug/${this.props.cmr.medications[0].id}`}>
                        <Button className={style.button}><b>NEXT</b></Button>
                    </Link>
                      <p />
                </Container>

            </Container>
        )
    }
}

/* gets what this page need from redux */
export default connect(
    ({
        patient,
        cmr
    }) => ({
            patient,
            cmr
        }),{
            savePageData
        }
)(MedsIdentified)
