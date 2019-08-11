import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

export default class Switch extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.bool
    }
    static defaultProps = {
        onChange: () => {},
        value: false
    }
    state = {
        status: false
    }
    componentWillMount() {
        this.setState({ status: this.props.value })
    }
    handleClick = () => {
        this.setState({ status: !this.state.status }, () => this.props.onChange(this.state.status))
    }
    render() {
        let className = style.switch
        if (this.state.status) {
            className += ' ' + style.switchOn
        }
        else {
            className += ' ' + style.switchOff
        }
        return (
            <span
                className={className}
                onClick={this.handleClick}
            />
        )
    }
}
