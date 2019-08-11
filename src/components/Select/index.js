import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

export default class Select extends Component {
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

        const isleftalign =  this.props.isleftalign
        if (isleftalign === "true"){
            className = style.selectLeft
        }

        if (this.props.success) {
            className += ' ' + style.selectSuccess
        }
        if (this.props.error) {
            className += ' ' + style.selectError
        }
        const props = {...this.props}
        delete props.success
        delete props.error
        return (
            <span className={style.selectLabel}>
              <select className={className} type="text" {...props}>
                {this.props.children}
             </select>
            </span>
        )
    }
}