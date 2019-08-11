import React, { Component, Fragment } from 'react'
import { Container, Button, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import style from './style.scss'
import ProgressBarPatient from 'components/ProgressBarPatient'
import { connect } from 'react-redux'
import { savePageData } from 'redux/page/action'
import HeartBeat from '../../../assets/health-bg-icon.svg'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');

export class PrepareChapter4 extends Component {
    componentWillMount() {
  
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){ 
            ReactGA.pageview(page); 
            
        
        //get the current chapter starting time from page data
            var  startTime = this.props.page.data.chapter3Time; 
                //current time, it gives the ending time of the previous chapter
                var currentTime = Date.now(); 
                //if start time avaliable, find the difference. it gives the total time spent on current chapter 
                if(startTime) {
                    var diff = currentTime - startTime; 

                    //generate the timing event to GA
                    ReactGA.timing({
                        category: 'Registration',
                        variable: 'Chapter-3',
                        value: diff, // in milliseconds
                        label: 'Total Time'
                    });
                }

                    // keep the loading time of the 1st page of a chapter  page in page data,
                // so in chapter page display, we  can calcualte the total time for that chapter
                this.props.savePageData({
                    chapter4Time: Date.now()
                })
    }
    }
    
    render() {
        return (
            <Fragment>
                <Row>
                    <Col className={style.pictureWrapper}>
                        <HeartBeat className={style.pillWrapper} alt="Pill" />
                    </Col>
                </Row>

                 <Container fluid className= {style.mainBodyPosition}>

                    <Row className={style.bg}>
                        <Col className={style.mainHeader}>
                            <strong>
                                    <h1 className={style.heading}>
                                        Almost Done! You've Completed Step 3
                                    </h1> 
                                    <span>
                                        Keep going to make sure you are getting all the care you need!
                                    </span>
                            </strong>
                        </Col>
                    </Row>

                    <Row>
                        <Col className={style.bodyList}>
                            <ul className={style.bulletPoints}>
                                <li>We now know all the medications you are taking, so our pharmacists can make sure you are taking them safely. </li>
                                <li>Next we are going to ask you some questions about your health, so we can make sure you are getting the care you need.</li>
                                <li>By answering these questions, we can work with your doctor to make sure that your health is improving as much as possible.</li>    
                                <li>This information helps our pharmacists undertand what services you need in order to best manage your conditions.</li>
                            </ul>
                        </Col>
                    </Row>

                    <Row>
                        <Col className={style.buttonInputWrapper}>
                            <div className={style.buttonWrapper}>
                                <Link to='/smart-questions/hedis/1'>
                                    <Button className = {[style.btn, style.btnNext, style.customBtnNext]}>
                                        NEXT 
                                    </Button>
                                </Link>
                            </div>
                        </Col>
                    </Row> 
                    <span className={style.footerWrapper}>
                        <ProgressBarPatient step={4} />
                   </span>)
                </Container>
            
             

            </Fragment>
        )
    }
}

export default connect(
    ({
        page,
        cmr
    }) => ({
        page,
            cmr
        }),
    {
        savePageData 
     }
)(PrepareChapter4)
