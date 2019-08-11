import React, { Component } from 'react'
import { Container, Form, Button,Row, Col } from 'reactstrap'
import InputTextWithError from 'components/InputTextWithError'
import { Link } from 'react-router-dom'
import ProgressBarPatient from 'components/ProgressBarPatient'
import style from './style.scss'
import { connect } from 'react-redux'
import { savePageData } from 'redux/page/action'
import { callSyncAPIGateway } from 'redux/apiGateway/action'
import { push } from 'react-router-redux'
import ReactGA from 'react-ga';
import Faq from 'assets/question.svg'

ReactGA.initialize('UA-121783543-1');


export class NewRegistration extends Component {
    state = {
        insuranceId: '',
        found: null,
        accountExists: null,
        isLoading: false
    }

    componentDidMount() {
        //find the current page and send the current page stats to GA
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }
        //set the state of the progress ProgressBarPatient
        this.props.savePageData({
            ShowProgressStep: 1
          })

        //get the current sesion id for tracker
        var gaSessionId;
        ReactGA.ga((tracker) => {
            gaSessionId = tracker.get('clientId');
          });

        //send the GA event to log someone landed in hpid search page
        if (process.env.NODE_ENV == 'production'){
        ReactGA.event({
            category: 'Registration',
            action: 'Search Landed',
            label: gaSessionId,
            nonInteraction: false
        });
      }
    }


    goToHelpMeFindHPID = () => {
        this.props.savePageData({
            isCaregiver: false
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        if (this.state.insuranceId) {
            await this.props.callSyncAPIGateway('usersLookupInsuranceIdPost', null, { insurance_id: this.state.insuranceId.toUpperCase() })
            /* get the result from redux */
            const result = this.props.page.apiData
            let { found, accountExists } = result
            found = found === "true"
            if (accountExists) {
                accountExists = accountExists === "true"
            }

            var gaSessionId;
            ReactGA.ga((tracker) => {
                gaSessionId = tracker.get('clientId');
              });
             if (process.env.NODE_ENV == 'production'){
            if(!found){
                ReactGA.event({
                    category: 'Registration',
                    action: 'ID Not Found',
                    label: gaSessionId,
                    nonInteraction: false
                });
            }
          }
          if (process.env.NODE_ENV == 'production'){
            if(accountExists){
                ReactGA.event({
                    category: 'Registration',
                    action: 'ID Already Exists',
                    label: gaSessionId,
                    nonInteraction: false
                });
            }
           }

            this.setState({ found, accountExists })
            if (found && !accountExists) {
                /* save the insuranceId to the redux */
                this.props.savePageData({
                    insuranceId: this.state.insuranceId.toUpperCase()
                })
                this.props.push('/new-registration-hpid-link-confirm')
                if (process.env.NODE_ENV == 'production'){
                    ReactGA.event({
                        category: 'Registration',
                        action: 'ID Found',
                        label: gaSessionId,
                        nonInteraction: false
                    });
                }
            }
            if (process.env.NODE_ENV == 'production'){
                ReactGA.event({
                    category: 'Registration',
                    action: 'Search Performed',
                    label: gaSessionId,
                    nonInteraction: false
                });
        }
        }


    }
    handleInputText = (event) => {
        const { name, value } = event.target
        const state = {}
        state[name] = value
        state["found"] = null
        state["accountExists"] = null
        this.setState(state)
    }
    render() {
        return (
                    <Form onSubmit={this.handleSubmit}>
                    <Row>
                         <Col  className={[style.headingText, style.componentGap].join(' ')}>
                            To get started, please enter your Health Plan Identification Number below.
                         </Col>
                    </Row>
                    <Row >
                        <Col className={style.componentGap}>
                          <InputTextWithError
                              label="ENTER HEALTH PLAN IDENTIFICATION NUMBER"
                              name="insuranceId"
                              autoFocus
                              type="text"
                              value={this.state.insuranceId}
                              onChange={this.handleInputText}
                              placeholder="Your Health Plan Identification Number"
                              grayborder={true}
                              error={this.state.found === false }
                              error1={this.state.accountExists}
                              errorMessage="Uh oh! It looks like you might have entered the wrong number, or we can't find you in our system. Give us a call 1-833-ArineRx (1-833-274-6379) and we'll help you sort it out!"
                              errorMessage1="Uh oh! It looks like this insurance id is already associated with an account."
                          />
                             <div className={style.errorSpace}>

                            {
                                this.state.accountExists ? (
                                    <div className={style.loginText}>
                                      <Link to="/login">
                                      Click here to Sign In.
                                      </Link>
                                    </div>


                                ) : null
                            }
                         </div>
                         </Col>
                        </Row>
                        <Row>
                        <Col>
                            <Link  className={[style.rectangle, style.helpText].join(' ')} to="/help-me-find-hpid" onClick={() => this.goToHelpMeFindHPID()}>
                              <Faq className={style.icon}/> &nbsp;Help me find my Health Plan Identification Number
                            </Link>
                        </Col>
                        </Row>
                        <Row>
                            <Col >
                            <div className={style.buttonWrapper}>
                            <Button id="submit"   type="submit" className = {[style.btn, style.btnNext ]}
                              disabled={!this.state.insuranceId}>
                            NEXT STEP
                            </Button>
                            </div>

                            </Col>
                        </Row>

                    </Form>
        )
    }
}

export default connect(
    ({
        page
    }) => ({
            page
        }),
    {
        callSyncAPIGateway,
        savePageData,
        push
    }
)(NewRegistration)
