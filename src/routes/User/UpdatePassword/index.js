import React, { Component } from 'react'
import { Container, Button, Form } from 'reactstrap'
import InputText from '../../../components/InputText'
import Switch from '../../../components/Switch'
import { Link } from 'react-router-dom'
import style from './style.scss'

import { connect } from 'react-redux'
import { callSyncAPIGateway } from 'redux/apiGateway/action'
import { updatePassword } from 'redux/auth/action'
import { push } from 'react-router-redux'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');


const getUrlParameter = (query, name) => {
    // eslint-disable-next-line
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    let results = regex.exec(query)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export class UpdatePassword extends Component {
    state = {
        password: '',
        validation: {
            password: null
        },
        errorMSG: '',
        isShowPassword: false,
        securityPolicy: {
            passwordPattern: null,
            passwordMsg: null
        }
    }
    componentWillMount = async () => {
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }

        /* get params from URL (?token=******&code*******) */
        const queryParameter = this.props.router.location.search
        /* get token and code, filter by getUrlParameter function */
        const token = getUrlParameter(queryParameter, 'token')
        const code = getUrlParameter(queryParameter, 'code')
        /* if there are token and code then call API */

        if (token && code) {
            this.token = token
            this.code = code
            await this.props.callSyncAPIGateway('usersOrganizationPolicyGet', { token })
            const securityPolicy = this.props.page.apiData
            securityPolicy.passwordPattern = new RegExp(securityPolicy.passwordPattern)
            this.setState({ securityPolicy })
        }
        else {
            this.props.push('/login')
        }
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        /* checks if all input form is valid */
        const validation = Object.keys(this.state.validation).reduce((valid, key) => {
            if (!valid) {
                return valid
            }
            else {
                return this.state.validation[key] === true
            }
        }, true)
        if (validation) {
            await this.props.updatePassword({
                creds: {
                    token: this.token,
                    code: this.code,
                    password: this.state.password
                }
            })
        }
    }

    handleInputText = (event) => {
        const { name, value } = event.target
        const state = {}
        state[name] = value
        this.setState(state, () => this.handleValidation(name, value))
    }

    handleValidation = (name, value) => {
        switch (name) {
            case 'password':
                if (!this.state.securityPolicy.passwordPattern.test(value)) {
                    this.setValidationState(name, false)
                    return
                }
                break
            default: return
        }
        this.setValidationState(name, true)
    }

    setValidationState = (name, state) => {
        const validation = { ...this.state.validation }
        validation[name] = state
        this.setState({ validation })
    }

    isShowError(state) {
        return state === true || state === null
    }

    handleSwitchPassword = (value) => {
        this.setState({ isShowPassword: value })
    }

    render() {
        /* when user changes to show password then passwordInputType change to 'text' style */
        let passwordInputType = 'password'
        if (this.state.isShowPassword) {
            passwordInputType = 'text'
        }
        return (
            <Container fluid>
                <Container className={style.content}>
                    <p>
                        Let's get you a new password.
                    </p>
                    <div className={style.formWrapper}>
                        {this.state.errorMSG ? (
                            <div className={style.textError}>{this.state.errorMSG}</div>
                        ) : null}
                        <Form onSubmit={this.handleSubmit}>
                            <div>
                                <InputText
                                    name="password"
                                    type={passwordInputType}
                                    placeholder="enter new password"
                                    value={this.state.password}
                                    onChange={this.handleInputText}
                                    error={this.state.validation.password === false}
                                    success={this.state.validation.password}
                                />
                                {this.isShowError(this.state.validation.password) ? null : (
                                    <div className={style.textError}>{this.state.securityPolicy.passwordMsg}</div>
                                )}
                            </div>
                            <div>
                                <Switch onChange={this.handleSwitchPassword} />&nbsp;&nbsp;&nbsp;&nbsp;Show Password
                            </div>
                            <div className={style.passwordRule}>
                                For security purposes, {this.state.securityPolicy.passwordMsg}
                            </div>
                            <div>
                                <Button type="submit" className={style.button}>
                                    Change Password and Sign In
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Container>
               
            </Container>
        )
    }
}

export default connect(
    ({
        router,
        page,
        patient,
        cmr
    }) => ({
            router,
            page,
            patient,
            cmr
        }),
    {
        callSyncAPIGateway,
        updatePassword,
        push
    }
)(UpdatePassword)
