import React, { Component } from 'react'
import { Container, Button, Row, Col} from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import style from './style.scss'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');

import Health from 'assets/better_health.svg'
import Safety from 'assets/increase_safety.svg'
import Cost from 'assets/lower_cost.svg'

var start = Date.now();

export class WelcomeNew extends Component {

    handleReviewButton = async () => {
      if(this.props.user && JSON.stringify(this.props.user) !== '{}'){
        this.props.push('/landing-page')
      }
      else{
        this.props.push('/new-registration')
      }
    }

    componentWillUnmount(){
        // var end = Date.now();
        // var elapsed = end - start;

        // ReactGA.timing({
        //     category: 'Patient',
        //     variable: 'time',
        //     value: elapsed, // in milliseconds
        //     label:  window.location.pathname,
        //   });
    }

    componentDidMount() {
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }
    }

    render() {

        return (

                <Container fluid className={style.content}>
                <div className={style.empty20px} />
                    <div className={style.heading}> Welcome to Arine!

                <div className={style.empty20px} />
                    <div className={style.subheading}>
                     We will help you understand your medicines and use them safely.
                    </div>
                    </div>
                    <div className={style.empty30px} />
                    <div className={style.buttonWrapper}>
                    <Button id="welcomeNewbtn"  className = {[style.btn, style.btnNext ]} onClick={this.handleReviewButton} >START MY REVIEW</Button>
                    </div>
                    <Row className={style.inputWrapper}>
                    <div className={style.empty} />
                    <Col sm={12}>
                    <video
                               className={style.video}
                               controls
                               autoPlay
                               loop
                               src="https://s3.amazonaws.com/arine-content-public/web-site/video/arine_intro_v1.mov" />

                    </Col>
                    </Row>
                    <div className={style.empty} />
                     <div className={style.goalText}>Our goal is to provide you</div>
                    <Row className={style.inputWrapper}>
                    <Col sm={{size:1} } className={style.wrapper}>
                    <div className={style.oval}>
                    <Health className={style.iconSize} />
                    </div>
                    <div className={style.pointsHwading}> Better Health</div>

                    <div className={style.points}>

                        A trained pharmacist will help you achieve the maximum benefit from your medicines by ensuring that you are on the right medicines for your specific health conditions
                        </div>
                     </Col>
                     <Col sm={{size:1}} className={style.wrapper}>
                     <div className={style.oval}>
                     <Safety className={style.iconSize} />
                     </div>
                      <div className={style.pointsHwading}> Increase Safety</div>
                      <div className={style.points}>
                       Some medicines may cause side effects or may not work well when taken incorrectly or with other medicines. The pharmacist will make sure that you are taking the right combination of medicines and also provide tips on how to manage any side effects.
                       </div>
                      </Col>
                      <Col sm={{size:1}} className={style.wrapper}>
                        <div className={style.oval}>
                          <Cost className={style.iconSize} />
                        </div>
                        <div className={style.pointsHwading}> Lower Costs</div>
                        <div className={style.points}>
                          The pharmacist can also look for ways to save you money by recommending lower cost options or removing any unnecessary medicines.
                       </div>
                     </Col>
                </Row>

                <Row>
                <div className={style.empty1} />
                    <Col xs={12}>
                    <div className={style.contact}>
                          If you have any questions or any technical problems, please contact us<br />
                           at <span className={style.contactNumber}>{process.env.ARINE_PHONE}</span> or email us at  <span className={style.contactNumber}>{process.env.ARINE_EMAIL}</span>
                           </div>
                     </Col>
                </Row>

                </Container>

        )
    }
}

export default connect(
    ({ user,
      patient,
      page }) => ({ user,
                    patient,
                    page }),
    { push }
)(WelcomeNew)
