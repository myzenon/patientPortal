import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import style from './style.scss'
import ProgressBarPatient from 'components/ProgressBarPatient'
import ReactGA from 'react-ga';

ReactGA.initialize('UA-121783543-1');

export class CaregiverPatientLookupConfirm extends Component {
       
    componentDidMount() {         
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){ 
            ReactGA.pageview(page); 
        } 
    }
    
    handleYesButton = async () => { 
          this.props.push('/caregiver-consent') 
      }

      handleNoButton = async () => { 
        this.props.push('/caregiver-patient-lookup') 
    }

    render() {
        // get firstname and lastname from apiData
        const { firstName, lastName } = this.props.page.apiData
        return (
            <Container fluid>
                <Container className={style.content}>
                
                <Row className={style.inputWrapper}>
               
                    <Col> 
                      <div className={style.heading}>
                        Awesome! It looks like you are trying to help <strong>{firstName} {lastName}</strong> today.
                
                    </div>

                     <span className={style.subHeading}>
                     Is that right?
                    </span>

                    <div className={style.buttonWrapper}>  
                        <span className={style.buttonGap}>
                        <Link to="/caregiver-consent">
                        <Button id="yesButton" onClick={this.handleYesButton}  className = {[style.btn, style.btnOutlineBackText ]}>
                            <span className={style.buttonText}>
                            Yes
                            </span>
                        </Button>
                        </Link>
                    </span>
                    <span>
                    <Link to="/caregiver-patient-lookup">
                        <Button  id="noButton"  className = {[style.btn, style.btnOutlineBackText ]}>
                            <span className={style.buttonText}>
                            No
                            </span>
                        </Button>  
                        </Link>
                        </span>
                     </div>
                     <div class={style.empty100} />
                     <span className={style.belowText}>
                     As a caregiver, you will be asked questions as if YOU were the patient. We've put you in their shoes!
                    </span>
                   
                    </Col>
                    </Row>
                 
                  
                     <div class={style.empty100} />

                </Container>
                <span className={style.footerWrapper}>
                    <ProgressBarPatient step={1} />
                </span>
            </Container>
        )
    }
}

export default connect(
    ({
        page
    }) => ({
        page
    })
)(CaregiverPatientLookupConfirm)
