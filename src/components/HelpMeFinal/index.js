import React, { Component } from 'react'
import { Button } from 'reactstrap'
import style from './style.scss'

import { Link } from 'react-router-dom'
import Mail from 'assets/mail.svg'
import Call from 'assets/call_black.svg' 
import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');

export default class HelpMeFinal extends Component {
    static defaultProps = {
        onDone: () => {}
    }
    componentDidMount() {
        const page = window.location.pathname + window.location.search;
        ReactGA.pageview(page);
    }

    render() {
        return (
            <div className={style.wrapper}>
 
                 <div className={style.header}> 

                   <span
                              className={style.headerText}>
                      &nbsp;&nbsp;&nbsp;Give us a call and we'll sort it out
                      </span>
                            <span
                              className={style.headerTextCloseSucc}
                                onClick={this.props.onDone} >
                               &nbsp;
                                X
                            </span>
                            <div className={style.subHeading}>
                            (Don't worry, it's free!)
                            </div>

                    </div>

                        <div className={style.line} /> 
                        <div className={style.empty60} /> 
  
                      <div > 
                       
                       <Link  className={style.helpText} to="" >
                       <div className={style.rectangle}>
                       <span  className={style.iconAlign}> 

                       <Call className={style.phoneIcon}/>
                       </span>
                       
                       <span  className={style.iconTextlign}>

                        {process.env.ARINE_PHONE}
                        </span>
                       </div> 
                       </Link>
                
                   </div>
                   <div className={style.empty30} /> 
  
                <div className={style.emailUsText}> or email us at </div>
                <div className={style.empty30} /> 
  
                       <div > 
                       
                       <a  className={style.helpText} href={"mailto:" + process.env.ARINE_EMAIL + '"'} target="_blank">
                       <div className={style.rectangle}>
                       <span  className={style.iconAlign}> <Mail className={style.mailIcon}/>
                       </span>
                       
                       <span  className={style.iconTextlign}>
                       {process.env.ARINE_EMAIL}
                       </span>
                       </div> 
                       </a>
                
                   </div>
 

               
            </div>
        )
    }
}
