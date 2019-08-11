import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

import ErrorMessage from 'components/ErrorMessage'

export default class SelectWithLabel extends Component {
    static propTypes = {
      success: PropTypes.bool,
      error: PropTypes.bool
    }
    static defaultProps = {
        success: false,
        error: false
    }
    render() {
        let className = style.select
        const textlabel = this.props.label

        const isleftalign =  this.props.isleftalign
        if (isleftalign === "true"){
            className = style.selectLeft
        }

        let errorMessage="  ";
        if (this.props.error)
          errorMessage = this.props.errorMessage

        const props = {...this.props}
        delete props.success
        delete props.error
        return (
            <div className={style.rectangle}>
            <label className={style.textName}>{textlabel}</label>
            <span className={style.selectLabel}>
              <select className={className} type="text" {...props}>
                {this.props.children}
             </select>
            </span>
            {errorMessage != undefined ?
                 (this.props.error ) ? <ErrorMessage  message={errorMessage} /> :null
                :null}
            </div>
        )
    }
}
