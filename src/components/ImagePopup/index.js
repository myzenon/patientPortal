import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'reactstrap'
import style from './style.scss'

import InputTextWithError from 'components/InputTextWithError' 

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');


export default class ImagePopup extends Component {
    
    render() {
     

        return (
            <div>
                <div className={style.wrapper}>
                
                    <div className={style.header}> 
                          <span>
                               {this.props.name}
                          </span>
                            <span
                               className={style.headerTextCloseSucc}
                                onClick={this.props.onClose} >
                               &nbsp;
                                X
                            </span> 
                    </div>
   
              <div className={style.imageWrapper}>   
                 { 
                   
                     this.props.src ? ( 
                        <div> 
                         <img
                            alt=""
                            {...this.props}
                            onClick={this.handleZoomIn}
                            className={style.cover}
                        />  
 
                        </div>
                    ) : 
                    <div> 
                          <label className={style.NoImageText}> Image Not Available</label>
                     </div>
                    
                    }  
           
                    </div>
                    </div>
                    
             
            </div>
        )
    }
}
 
