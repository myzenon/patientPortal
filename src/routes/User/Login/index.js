import React, { Component } from 'react'
import { Container, Row, Button, Form } from 'reactstrap'
import { Link } from 'react-router-dom'
import ForgotPassword from './ForgotPassword'
import InputText from 'components/InputText'
import Switch from '../../../components/Switch'
import style from './style.scss'
import { connect } from 'react-redux'
import { login } from 'redux/auth/action'
import { push } from 'react-router-redux'
import ReactGA from 'react-ga';
import InputTextWithError from 'components/InputTextWithError'
import PasswordTextWithError from 'components/PasswordTextWithError'

import ErrorMessage from 'components/ErrorMessage'

ReactGA.initialize('UA-121783543-1');

export class Login extends Component {
    state = {
        email: '',
        password: '',
        submit: false,
        invalidAuth: false,
        isLoading: false,
        isShowForgotPassword: false
    }
    handleInputText = (event) => {
        const { name, value } = event.target
        const state = {}
        state[name] = value
        state["invalidAuth"] = false
        this.setState(state)
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        this.setState({ submit: true })
        if (this.state.email && this.state.password) {
            this.setState({ invalidAuth: false })
            await this.props.login (
                this.state.email,
                this.state.password
            )
            const pageError = this.props.page.error
            if (pageError.status === 401) {
                this.setState({ invalidAuth: true })
            }
        }
    }

    showForgotPassword = () => {
        this.setState({ isShowForgotPassword: true })
    }

    closeForgotPassword = () => {
        this.setState({ isShowForgotPassword: false })
    }

    componentDidMount() {
      //set the state of the progress ProgressBarPatient
      // var ProgressBarStep  =   this.props.ProgressBarStep;
      // ProgressBarStep('2')
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }
    }

    render() {
        return (
            <Row  className={style.loginBackground}>
            {/* show the ForgetPassword component when user clicks forget password */}
                {this.state.isShowForgotPassword ? (<ForgotPassword onClose={this.closeForgotPassword} />) : null}
                <Container >
                <div className={style.empty} />
                <div className={style.headingText}>
                           Member Sign In
                  </div>
                    <div className={style.formWrapper}>
                        <Form onSubmit={this.handleSubmit}>

                        <div className={style.componentGap}>

                                    <InputTextWithError
                                        name="email"
                                        label="EMAIL"
                                        errorMessage="Email is empty."
                                        autoFocus
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.handleInputText}
                                        placeholder={"Your email address"}
                                        error={this.state.submit && !this.state.email}
                                    />

                                </ div>
                           <div className={style.componentGap}>

                            <PasswordTextWithError
                                    name="password"
                                    label="PASSWORD"
                                    errorMessage="Password is empty."
                                    autoComplete="a-password"
                                    value={this.state.password}
                                    onChange={this.handleInputText}
                                    placeholder="Your password"
                                    error={this.state.submit && !this.state.password}
                                />

                                </ div>

                                {this.state.invalidAuth ? (
                                           <ErrorMessage  message="Error: Wrong email or password." />
                                    ) : null }


                                <div className={style.paddingSpace}>
                                    <span
                                        className={style.forgotPasswordText}
                                        onClick={this.showForgotPassword}
                                    >
                                        Forgot Password?
                                    </span>
                                </div>
                              <div className={style.buttonWrapper}>
                                <Button id="btnlogin" type="submit" className={style.btn}>
                                <span className={style.buttonText}>
                                SIGN IN
                                </span>
                                </Button>
                            </div>
                            </Form>
                        <span className={style.newRegistration}>Don't have an account?
                        &nbsp;
                            <Link to='/welcome-new'>
                            <span className={style.registrationText}>Register Now</span>
                            </Link>
                        </span>
                        <div>
                        </div>
                    </div>
                </Container>
            </Row>
        )
    }
}

export default connect(
    ({ patient, cmr, page }) => ({ patient, cmr, page }),
    { login, push }
)(Login)
