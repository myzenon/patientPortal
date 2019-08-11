import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss' 

export default class InputTextAreaWithError extends Component {

    static propTypes = { 
      grayborder: PropTypes.bool 
    }
    
    static defaultProps = { 
        grayborder: false
    }

    
    render() {
        let className = style.textBoxInputWrapper 
        let borderClassName = style.rectangle 
        const textlabel = this.props.label 
       
        if(this.props.grayborder){
            borderClassName = style.grayRectangle 
        } 

        const props = {...this.props}
        delete props.success
        delete props.error
        return (
            <div className={borderClassName}>
               {textlabel != undefined ?
                <label className={style.textName}>{textlabel}</label>
                :null} 
                <textarea
                        className={className} 
                        type="text"
                        {...props} 
                    /> 
            </div>
        )
    }
}
