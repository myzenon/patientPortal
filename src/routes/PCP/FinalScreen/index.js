import React, { Component } from 'react'
import { Container, Col, Row } from 'reactstrap'
import { connect } from 'react-redux'
import style from './style.scss'
import ProgressBarPatient from 'components/ProgressBarPatient'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');


export class FinalScreen extends Component {
    componentWillMount = () => {
        
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){ 
            ReactGA.pageview(page); 
        } 
        
        const patientName = this.props.patient.name[0].given[0]
        this.setState({patientName})
    }

    render() {
        return (
            <Container fluid>
                <Container className={style.content}>
                    <p className={style.congratulations} >
                        CONGRATULATIONS{' '+this.state.patientName.toUpperCase()}!
                    </p>
                    <p>
                        You have now completed the one of the most important steps of your Medication Review.
                    </p>
                    <div className={style.mediaWrapper}>
                        <Row>
                            <Col>
                                Video Clip
                            </Col>
                            <Col>
                                Schedule Calendar
                            </Col>
                        </Row>
                    </div>
                </Container>
                <span className={style.footerWrapper}>
                    <ProgressBarPatient step={5} />
               </span>
            </Container>
        )
    }
}

export default connect(
    ({ patient }) => ({ patient })
)(FinalScreen)