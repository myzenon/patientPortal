import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { callAPIGateway } from 'redux/apiGateway/action'
import { setCMR } from 'redux/cmr/action'
import style from './style.scss'
import ProgressBarPatient from 'components/ProgressBarPatient'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');



export class MethodDelivery extends Component {
    state = {
        getByEmail: false
    }

    componentWillMount = () => {
        
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){ 
            ReactGA.pageview(page); 
        }    
        
        /* gets the CMR data from redux though props */
        this.cmr = this.props.cmr
        let getByEmail = false
        if (this.cmr.deliveryMethods) {
            if (this.cmr.deliveryMethods[0].code === 'mail') {
                getByEmail = true
            }
        }
        this.setState({ getByEmail })
    }

    toggleCheckbox = () => {
        this.setState({ getByEmail: !this.state.getByEmail })
    }

    handleButton = async () => {
        let deliveryMethods = []
        /* if user check the checkbox then deliveryMethods = [{ code: 'mail' }] */
        if (this.state.getByEmail) {
            deliveryMethods = [{ code: 'mail' }]
        }
        await this.props.callAPIGateway('fhirCmrIdPut', { id: this.cmr.id }, { deliveryMethods })
        /* sets the cmr to the redux */
        this.cmr.deliveryMethods = deliveryMethods
        await this.props.setCMR(this.cmr)
        this.props.push('/final-screen')
    }

    render() {
        return (
            <Container fluid>
                <Container className={style.content}>
                    <p><strong>
                        Once our pharmacist completes your medication review,  We will email a link to your personal medication list and medication action plan.
                        </strong></p>
                    <table>
                        <tbody>
                            <tr className={style.checkboxWrapper} onClick={() => this.toggleCheckbox()}>
                                <td>
                                    <input
                                        name="getByEmail"
                                        className={style.checkbox}
                                        type="checkbox"
                                        checked={this.state.getByEmail}
                                        onChange={this.toggleCheckbox}
                                    />
                                </td>
                                <td>
                                    <span>
                                        In addition to the email, I would like a hard copy mailed to me.
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Button className={style.button} onClick={() => this.handleButton()} >Next</Button>
                </Container>
                <span className={style.footerWrapper}>
                    <ProgressBarPatient step={5} />
               </span>
            </Container>
        )
    }
}
export default connect(
    ({
        cmr
    }) => 
    ({
        cmr
    }),
    {
        callAPIGateway,
        push,
        setCMR
    }
)(MethodDelivery)