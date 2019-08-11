import React, { Component } from 'react'
import { Container, Button, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import ProgressBarPatient from 'components/ProgressBarPatient'
import style from './style.scss'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { savePageData } from 'redux/page/action'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');



export class HEDISCheckIn extends Component {
  componentWillMount() {
    //set the state of the progress ProgressBarPatient
    this.props.savePageData({
        ShowProgressStep: 4
      })
    }
    componentDidMount() {
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }
    }

    handleButton = () => {
        /* if smart questions is completed, goes to PrepareChapter5 page */
        if (this.props.cmr.smartQuestionsCompleted) {
            this.props.push('/prepare-Chapter5')
        }
        /* if smart questions is not completed, goes to smart-questions 1 page */
        else {
            this.props.push('/smart-questions/hedis/1')
        }
    }
    render() {
        return (
            <Container fluid>
                <Container className={style.content}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <img src={require('assets/hedis-checkin.png')} alt="hedis-checkin" />
                        </Col>
                        <Col xs={12} sm={8}>
                            <p>We're almost done!</p>
                            <p>We only have a few questions left about your health conditions</p>
                        </Col>
                    </Row>
                    <Button className={style.button} onClick={this.handleButton}>NEXT</Button>
                </Container>
                
            </Container>
        )
    }
}

export default connect(
    ({
        cmr
    }) =>
    ({
        cmr
    }),
    {
        push,savePageData
    }
)(HEDISCheckIn)
