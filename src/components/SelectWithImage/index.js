import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

import { Container, Button, Col, Row } from 'reactstrap'
import ErrorMessage from 'components/ErrorMessage'

import Doctor from 'assets/doctor.svg'
import Pharma from 'assets/pharmacy.svg'


export default class SelectWithImage extends Component {
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
             <span  className={style.leftPanel}>
             <span  className={style.nameCircle}>
                   <label className={style.errorStyle}>  
                   {this.props.image === "doctor" ?
                      <Doctor  className={style.picture}/> :
                      <Pharma  className={style.picture}/>
                 }
                    </label>
              </span>
              </span>
 
            <span>                  
                <label className={style.textName}>{textlabel}</label> 
                    <span className={style.selectLabel}>
                    <select className={className} type="text" {...props}>
                        {this.props.children}
                    </select>
                    </span>
                   
              </span>
    
            </div>
        )
    }
}