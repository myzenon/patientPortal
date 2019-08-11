import React, { Component } from 'react'
import style from './style.scss'

import Step1Active from 'assets/step1.svg'
import Step1Grey from 'assets/step1_grey.svg'

import Step2Active from 'assets/step2.svg'
import Step2Grey from 'assets/step2_grey.svg'

import Step3Active from 'assets/step3.svg'
import Step3Grey from 'assets/step3_grey.svg'

import Step4Active from 'assets/step4.svg'
import Step4Grey from 'assets/step4_grey.svg'

import Step5Active from 'assets/step5.svg'

import Checkmark from 'assets/checkmark.svg'
import {  isReviewedMedsComplete } from 'libs/utils'

export default class ProgressBarPatient extends Component {
    render() {
        const step = this.props.step
        return (
                <div className={style.wrapper}>
                    <div className={1 === step ? style.stepActive : (1 < step ? style.stepCompleted : style.step)}>
                       <div className={1 === step ? style.stepNumberActive : (1 < step ? style.stepNumberCompleted : style.stepNumber)}>
                        <div className={1 === step ? style.topCircleActive : (1 < step ? style.topCircleCompleted : style.topCircle)}>
                       {
                           1 === step ? <span className={style.topCircleText}>1</span> :
                           (1 < step ? <Checkmark  className={style.step1GreyIconSize}/> :
                            <span className={style.topCircleText}>1</span>)
                       }

                        </div>

                        <div className={1 === step ? style.lineActive : (1 < step ? style.lineCompleted : style.lineYettoVisite)}/>


                        {1 === step ?
                            <Step1Active  className={style.step1IconSize}/>
                            : (1 < step ?  <Step1Grey  className={style.step1GreyIconSize}/>
                                : <span><span>&nbsp;STEP</span> <br/> <span>1</span></span>)}

                          </div>
                        <span className={1 === step ? style.stepNameActive : (1 < step ? style.stepNameCompleted : style.stepName)}>Account Setup</span>
                    </div>
                    <div className={2 === step ? style.stepActive : (2 < step ? style.stepCompleted : style.step)}>
                       <div className={2 === step ? style.stepNumberActive : (2 < step ? style.stepNumberCompleted : style.stepNumber)}>
                        <div className={2 === step ? style.topCircleActive : (2 < step ? style.topCircleCompleted : style.topCircle)}>
                        {
                           2 === step ? <span className={style.topCircleText}>2</span> :
                           (2 < step ? <Checkmark  className={style.step1GreyIconSize}/> :
                            <span className={style.topCircleText}>2</span>)
                       }
                        </div>

                         <div className={2 === step ? style.lineActive : (2 < step ? style.lineCompleted : style.lineYettoVisite)}/>


                        {2 === step ?
                            <Step2Active  className={style.step2IconSize}/>
                            : (2 < step ?  <Step2Grey  className={style.step2GreyIconSize}/>
                                : <span><span>&nbsp;STEP</span> <br/> <span>2</span></span>)}
                            </div>
                            <span className={2 === step ? style.stepNameActive : (2 < step ? style.stepNameCompleted : style.stepName)}>Medication Review</span>
                    </div>
                    <div className={3 === step ? style.stepActive : (3 < step ? style.stepCompleted : style.step)}>
                       <div className={3 === step ? style.stepNumberActive : (3 < step ? style.stepNumberCompleted : style.stepNumber)}>
                        <div className={3 === step ? style.topCircleActive : (3 < step ? style.topCircleCompleted : style.topCircle)}>
                        {
                           3 === step ? <span className={style.topCircleText}>3</span> :
                           (3 < step ? <Checkmark  className={style.step1GreyIconSize}/>:
                            <span className={style.topCircleText}>3</span>)
                       }
                        </div>
                        <div className={3 === step ? style.lineActive : (3 < step ? style.lineCompleted : style.lineYettoVisite)}/>


                        {3 === step ?
                            <Step3Active  className={style.step3IconSize}/>
                            : (3 < step ?  <Step3Grey  className={style.step3GreyIconSize}/>
                                : <span><span>&nbsp;STEP</span> <br/> <span>3</span></span>)}
                            </div>
                            <span className={3 === step ? style.stepNameActive : (3 < step ? style.stepNameCompleted : style.stepName)}>Additional  Medications</span>
                    </div>
                    <div className={4 === step ? style.stepActive : (4 < step ? style.stepCompleted : style.step)}>
                       <div className={4 === step ? style.stepNumberActive : (4 < step ? style.stepNumberCompleted : style.stepNumber)}>
                        <div className={4 === step ? style.topCircleActive : (4 < step ? style.topCircleCompleted : style.topCircle)}>
                        {
                           4 === step ? <span className={style.topCircleText}>4</span> :
                           (4 < step ?<Checkmark  className={style.step1GreyIconSize}/>:
                            <span className={style.topCircleText}>4</span>)
                       }
                        </div>
                        <div className={4 === step ? style.lineActive : (4 < step ? style.lineCompleted : style.lineYettoVisite)}/>

                        {4 === step ?
                            <Step4Active  className={style.step4IconSize}/>
                            : (4 < step ?  <Step4Grey  className={style.step4GreyIconSize}/>
                                : <span><span className={style.step} >&nbsp;STEP</span> <br/> <span className={style.stepNumber} >4</span></span>)}
                            </div>
                            <span className={4 === step ? style.stepNameActive : (4 < step ? style.stepNameCompleted : style.stepName)}>Health Updates</span>
                    </div>
                    <div className={5 === step ? style.stepActive : (5 < step ? style.stepCompleted : style.step)}>
                       <div className={5 === step ? style.stepNumberActive : (5 < step ? style.stepNumberCompleted : style.stepNumber)}>
                        <div className={5 === step ? style.topCircleActive : (5 < step ? style.topCircleCompleted : style.topCircle)}>
                        {
                           5 === step ? <span className={style.topCircleText}>5</span> :
                           (5 < step ? <Checkmark  className={style.step1GreyIconSize}/>:
                            <span className={style.topCircleText}>5</span>)
                       }

                        </div>
                        {5 === step ?
                            <Step5Active  className={style.step4IconSize}/>
                            : (5 < step ?  <Step5Active  className={style.step5GreyIconSize}/>
                                : <span><span>&nbsp;STEP</span> <br/> <span>5</span></span>)}
                            </div>
                            <span className={5 === step ? style.stepNameActive : (5 < step ? style.stepNameCompleted : style.stepName)}>Set Appointment</span>
                    </div>
                </div>
        )
    }
}
