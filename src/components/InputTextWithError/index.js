import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import ErrorMessage from 'components/ErrorMessage'

export default class InputTextWithError extends Component {

    static propTypes = {
      success: PropTypes.bool,
      error: PropTypes.bool,
      grayborder: PropTypes.bool,
      error1: PropTypes.bool
    }

    static defaultProps = {
        success: false,
        error: false,
        grayborder: false,
        error1: false,
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

        if (this.props.error1){
            errorMessage = this.props.errorMessage1
            borderClassName = style.errorRectangle
        }


       if(this.props.readonly){
            borderClassName = style.readOnlyRectangle
       }

        if (textalign === "center"){
            className = style.inputTextCenter
        }

        const props = {...this.props}
        delete props.success
        delete props.error
        return (
            <div className={borderClassName}>
               {textlabel != undefined ?
                <label className={style.textName}>{textlabel}</label>
                :null}
                <input className={className} type="text" {...props} />
                {errorMessage != undefined ?
                 (this.props.error || this.props.error1 ) ? <ErrorMessage  message={errorMessage} /> :null
                :null}
            </div>
        )
    }
}
