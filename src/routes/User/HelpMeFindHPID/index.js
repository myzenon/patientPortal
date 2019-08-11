import React, { Component } from 'react'
import { Container, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import style from './style.scss'
import HelpMeFinal from 'components/HelpMeFinal'
import { savePageData } from 'redux/page/action'
import ReactGA from 'react-ga';
import { ALPN_ENABLED } from 'constants';

ReactGA.initialize('UA-121783543-1');

export class HelpMeFindHPID extends Component {
    state = {
        showHelpMeFinal: false,
        foundItLink: '/new-registration'
    }
    componentWillMount = () => {  
     
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){ 
            ReactGA.pageview(page); 
        }   

        if (this.props.page.data.isCaregiver) {
            this.setState({ foundItLink: '/caregiver-patient-lookup' })
        }
    }
    setHelpMeFinalPopup = (state) => {
        this.setState({
            showHelpMeFinal: state
        })
    }

    render() {

        return (
            <Container fluid>
                {this.state.showHelpMeFinal ? (<HelpMeFinal onDone={() => this.setHelpMeFinalPopup(false)} />) : null}
                <Container className={style.content}>
                <div className={style.empty}/>
                    <div className={style.headingText}>
                            You should have a Health Plan Card, that looks like this one:
                      </div>
                      <div className={style.empty20}/>
                    <p>
                        <img src={require('../../../assets/health-plan-card-help.png')} alt="Health Plan Card" />
                    </p>
                   
                        <div className={style.buttonWrapper}>
                        <Link to={this.state.foundItLink}> 
                            <Button className = {[style.btn]}>
                                FOUND IT!
                            </Button>
                           
                        </Link>
                        </div> 
                    <div className={style.buttonWrapper}>

                        <Button className = {[style.btn]} onClick={() => this.setHelpMeFinalPopup(true)} >
                            DIDN'T FIND IT
                            </Button>
                            </div>

                   
                </Container>
            </Container>
        )
    }
}

export default connect(
    ({
        page
    }) => ({
            page
        })
)(HelpMeFindHPID) 