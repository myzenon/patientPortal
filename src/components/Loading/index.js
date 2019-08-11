import React, { Component } from 'react'
import style from './style.scss'

export default class Loading extends Component {
    state = {  }
    render() {
        return (
            <div className={style.wrapper}>
                <div className={style.loader} />
            </div>
        )
    }
}