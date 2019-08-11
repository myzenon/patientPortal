import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

export default class ProgressBar extends Component {
    static propTypes = {
        percent: PropTypes.number
    }
    static defaultProps = {
        percent: 0
    }
    render() {
        let progressStyle = {
            width: `${this.props.percent}%`
        }
        return (
            <div className={style.wrapper}>
                <div className={style.progress} style={progressStyle} />
            </div>
        )
    }
}