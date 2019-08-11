import React, { Component } from 'react'
import { Container, Row, Col, Button, Form } from 'reactstrap'
import Policies from 'components/Policies'

import style from './style.scss'

import { connect } from 'react-redux'
import { callAPIGateway } from 'redux/apiGateway/action'
import { setPatient } from 'redux/patient/action'
import { push } from 'react-router-redux'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');


// load policies from files.
const policies = {
    nopp: require('assets/policy/nopp.html'),
    eula: require('assets/policy/eula.html'),
    terms: require('assets/policy/terms.html'),
    access: require('assets/policy/access.html')
}

// find policy version from html
const findPolicyVersion = (policy) => {
    const htmlElements = policy.replace(/(?:\\[rn]|[\r]+)+/g, '').split('\n')
    const versionElement = htmlElements[htmlElements.indexOf('<meta charset="UTF-8">') + 1]
    return versionElement.split('"')[1]
}

export class UpdatePolicies extends Component {
    state = {
        acceptStatus: false
    }
    toggleAccept = () => {
        this.setState({
            acceptStatus: !this.state.acceptStatus
        })
    }
   
    componentDidMount() {         
        const page = window.location.pathname + window.location.search;  
        if (process.env.NODE_ENV == 'production'){ 
            ReactGA.pageview(page); 
        }     
    }

    handleButton = async () => {
        const date = new Date()
        // call usersUpdateUserPut API
        await this.props.callAPIGateway('usersUpdateUserPut', null, {
            'noppStatus': true,
            'nopp': {
                'Date': date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate(),
                'vNopp': findPolicyVersion(policies.nopp),
                'vTerms': findPolicyVersion(policies.terms),
                'vEnd': findPolicyVersion(policies.eula)
            }
        })
        // setPatient to redux
        this.props.setPatient({
            ...this.props.patient,
            noppStatus: true
        })
        this.props.push('/confirm-info')
    }
    render() {
        return (
            <Container fluid>
                <Container className={style.content}>
                    <p>
                        <strong>We at Arine take your Privacy Very Seriously.</strong>
                    </p>
                    <p>
                        Our Policies have changed. Please read the statements below about how medical information about you may be used and disclosed and how you can get access to this information.
                    </p>
                    <div className={style.policies}>
                        <Policies popup={false} />
                    </div>
                    <div className={style.agreeCheckbox}>
                        <Row>
                            <Col xs={2}>
                                <input
                                    type="checkbox"
                                    value={this.state.acceptStatus}
                                    onChange={this.toggleAccept}
                                />
                            </Col>
                            <Col xs={10}>
                                I have read and agree to the Notice of Privacy Practices, Terms of Service and End User License Agreement
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Button
                            type="button"
                            className={style.button}
                            onClick={this.handleButton}
                            disabled={!this.state.acceptStatus}
                        >
                            NEXT
                        </Button>
                    </div>
                    <div className={style.questionWrapper}>
                        Questions ?
                    </div>
                </Container>
            </Container>
        )
    }
}

export default connect(
    ({
        patient,
        page
    }) => ({
        patient,
        page
    }),
    {
        callAPIGateway,
        setPatient,
        push
    }
)(UpdatePolicies)