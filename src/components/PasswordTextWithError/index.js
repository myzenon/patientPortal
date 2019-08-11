import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import ReactDOM from 'react-dom'
import { Container, Button, Form } from 'reactstrap'

import EyeIconShow from 'assets/password_show.svg'
import EyeIconHide from 'assets/password_hide.svg'

import ErrorMessage from 'components/ErrorMessage'

export default class PasswordTextWithError extends Component {
    state = {
        isShowPassword: false
    }
    static propTypes = {
      success: PropTypes.bool,
      error: PropTypes.bool,
      showPassword: PropTypes.bool,
      grayborder: PropTypes.bool,
    }

    static defaultProps = {
        success: false,
        error: false,
        grayborder: false,
        showPassword: false
    }
    handleSwitchPassword = (event) => {
        event.preventDefault();
        this.setState({ isShowPassword: !this.state.isShowPassword })
    }

    componentWillMount() {
        this.state.isShowPassword= true
    }

    render() {
        let className = style.inputText
        let borderClassName = style.rectangle
        const textalign =  this.props.textalign
        const textlabel = this.props.label

        let errorMessage="  ";

        if(this.props.grayborder){
            borderClassName = style.grayRectangle
        }

        if (this.props.error){
          errorMessage = this.props.errorMessage
          borderClassName = style.errorRectangle
        }

        if (textalign === "center"){
            className = style.inputTextCenter
        }

       /* when user changes to show password then passwordInputType change to 'text' style */
       let passwordInputType = 'password'
       if (this.state.isShowPassword) {
           passwordInputType = 'text'
       }
        const props = {...this.props}
        delete props.success
        delete props.error

        return (
            <div className={borderClassName}>
                <label className={style.textName}>{textlabel}</label>
                <input className={className} type={passwordInputType} {...props} />
                <Button  className={style.hideForMobile} id="btnShowPassword"  type="button" 
                onClick={e => this.handleSwitchPassword(e)} >{this.state.isShowPassword === true ?
                    <span> <EyeIconHide  className={style.eye}/>  <span  className={style.showHideText}>&nbsp;HIDE</span> </span>:
                    <span> <EyeIconShow  className={style.eye}/>  <span  className={style.showHideText}>&nbsp;SHOW </span> </span> }
                </Button>
                {errorMessage != undefined ?
                 this.props.error ? <ErrorMessage  message={errorMessage} />  :null
                :null}

            </div>
        )
    }
}
