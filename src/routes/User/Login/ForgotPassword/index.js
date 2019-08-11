import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'reactstrap'
import style from './style.scss'

import InputTextWithError from 'components/InputTextWithError'
import { connect } from 'react-redux'
import { callAPIGateway } from 'redux/apiGateway/action'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');


export class ForgotPassword extends Component {
    static propTypes = {
        onClose: PropTypes.func
    }
    static defaultProps = {
        onClose: () => {}
    }
    state = {
        email: '',
        isEmailValid: null,
        isShowSuccess: false,
        submit: false,
    }
    componentDidMount() {
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }
    }
    handleInput = (event) => {
        const { value } = event.target
        this.setState({ email: value })
    }
    validateEmail = () => {
        this.setState({ submit: true })
        /*eslint-disable */
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        /*eslint-enable */
        const isEmailValid = regex.test(this.state.email)
        this.setState({ isEmailValid })
        return isEmailValid
    }
    onFocusEmail = () => {
        //if there is a error in format of email user is trying to fix so clear it
          let isEmailValid = true
          this.setState({ isEmailValid })
        //}
        return isEmailValid
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        this.setState({ submit: true })
        if (this.validateEmail()) {
            this.props.callAPIGateway('usersForgotPasswordPost', null, {
                creds: {
                    user_name: this.state.email
                }
            })
            this.setState({ isShowSuccess: true })
        }
    }
    render() {
        /* when the handlesubmit is completed then return renderSuccess */
        if (this.state.isShowSuccess) {
            return this.renderSuccess()
        }

       
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <div className={style.wrapper}>
                        <div className={style.header}>
                        <span
                              className={style.headerText}>
                                Password Reset
                              </span>
                            <span
                              className={style.headerTextClose}
                                onClick={this.props.onClose} >  
                                X
                            </span>
                        </div>

                        <div className={style.line} /> 
                        <div className={style.content}>
                        <div>
                             Enter your email address. If you are registered, we will send you an email with instructions on how to reset your password. 
                           </div>  
                            <InputTextWithError
                                        name="email"
                                        label="EMAIL" 
                                        autoFocus
                                        type="email"  
                                        placeholder={"Enter your email address"} 
                                        onChange={this.handleInput}
                                        onBlur={this.validateEmail} 
                                        onFocus={ this.onFocusEmail } 
                                        error={this.state.submit && !this.state.email}  
                                        grayborder={true}
                                        errorMessage="Please enter a valid email address."
                                    />  
                         
                        </div>
                        
                        <div className={style.buttonWrapper}> 
                            <Button id="btnlogin" type="submit" className={[style.btn]} disabled={this.state.isEmailValid === false}> 
                                SEND EMAIL
                            </Button>
                        </div>
                    </div>
                 </Form>
            </div>
        )
    }
    renderSuccess() {
        return (
            <div>
                <div className={style.wrapper}>
                
                    <div className={style.header}> 
                          <span>
                          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;Password reset email has been sent!
                            </span>
                            <span
                              className={style.headerTextCloseSucc}
                                onClick={this.props.onClose} >
                               &nbsp;
                                X
                            </span>

                    </div>

                        <div className={style.line} /> 
                        <div className={style.empty} /> 
                        
                    <div className={style.content}>
                        <p>
                        We have sent a password reset email to <strong>{this.state.email}</strong>.
                        </p>
                        <p>
                        Please check your email in a few minutes. If you haven't received it, please check your spam folder.
                        </p>
                        <p>
                        The email will be from <span className={style.contactNumber}>{process.env.ARINE_EMAIL}</span>.
                        </p>
                        <p>
                        If you do not receive an email, please call Arine at <span className={style.contactNumber}> {process.env.ARINE_PHONE}</span>.
                        </p>
                        
                    </div>
                    <div className={style.buttonWrapper}>
                   <br />
                    <Button type="button"
                            onClick={this.props.onClose}
                             className={[style.btn]}> 
                            DONE
                        </Button>
                        </div>
                    
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    { callAPIGateway }
)(ForgotPassword)
