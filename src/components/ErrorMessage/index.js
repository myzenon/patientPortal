import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import ReactDOM from 'react-dom' 

import Alert from 'assets/error_con.svg'

export default class ErrorMessage extends Component {
 
    render() {
        let errorMessage="  ";
        errorMessage = this.props.message 

        const props = {...this.props} 
        return ( 
               <label className={style.errorStyle}> <Alert  className={style.eye}/>&nbsp;{errorMessage}</label> 
               
        )
    }
}
