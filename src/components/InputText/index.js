import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import ReactDOM from 'react-dom'

export default class InputText extends Component {

    static propTypes = {
      success: PropTypes.bool,
      error: PropTypes.bool
    }
    static defaultProps = {
        success: false,
        error: false
    }

    focusTextInput() {
      // Explicitly focus the text input using the raw DOM API
      //make sure it is not disabled before trying to set focus
      ReactDOM.findDOMNode(this).disabled = false;
      ReactDOM.findDOMNode(this).focus();
    }

    render() {
        let className = style.inputText
        if (this.props.success) {
            className = style.inputTextSuccess
        }
        if (this.props.error) {
            className = style.inputTextError
        }

        const textalign =  this.props.textalign
        const ispassword =  this.props.ispassword

        if (ispassword === "true"){
            className = style.passwordText
            if (this.props.success) {
                className = style.passwordTextSuccess
            }
            if (this.props.error) {
                className = style.passwordTextError
            }
        } else if (textalign === "center"){
            className = style.inputTextCenter
            if (this.props.success) {
                className = style.inputTextCenterSuccess
            }
            if (this.props.error) {
                className = style.inputTextCenterError
            }
        }

        const props = {...this.props}
        delete props.success
        delete props.error
        return (
            <input className={className} type="text" {...props} />
        )
    }
}
