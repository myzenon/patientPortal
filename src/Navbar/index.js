import React, { Component } from 'react'
import { Container, Button, Row, Col} from 'reactstrap'
import { Link } from 'react-router-dom'
import MdArrowDown from 'react-icons/lib/md/arrow-drop-down'
import MdArrowUp from 'react-icons/lib/md/arrow-drop-up'

import style from './style.scss'

import HelpMeFinal from 'components/HelpMeFinal'
import HelpFAQ from 'components/FAQ'
import { countAmountMedsCompleted } from 'libs/utils'

import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'

import { resetAuth } from 'redux/auth/action'
import ContactUs from 'assets/contact_us.svg'
import Faq from 'assets/question.svg'

export class Navbar extends Component {
    state = {
        userMenuExpand: false,
        helpMenuExpand: false,
        showHelpMeFinal: false,
        showFAQ: false,
        myProgressExpand: false
    }
    toggleUserMenu = () => {
        this.setState({
            userMenuExpand: !this.state.userMenuExpand,
            helpMenuExpand: false,
            myProgressExpand: false
        })
    }
    toggleHelpMenu = () => {
        this.setState({
            helpMenuExpand: !this.state.helpMenuExpand,
            userMenuExpand: false,
            myProgressExpand: false
        })
    }
    toggleMyProgress = () => {
        this.setState({
            myProgressExpand: !this.state.myProgressExpand,
            userMenuExpand: false,
            helpMenuExpand: false
        })
    }
    setHelpMeFinalPopup = (state) => {
        this.setState({
            showHelpMeFinal: state
        })
    }
    setFAQPopup = (state) => {
        this.setState({
            showFAQ: state
        })
    }
    signOut = async () => {
        await this.props.resetAuth()
        this.props.push('/login')
    }

    isShowNavbar = () => {
        const currentPath = this.props.router.location.pathname
        const hideBarBlackLists = []
        // const hideBarBlackLists = ['/', '/welcome']
        if (hideBarBlackLists.indexOf(currentPath) === -1) {
            return true
        }
        return false
    }

    getTotalNumberofMedsReview = () => {
        // get cmr from redux
        const { cmr } = this.props

        // get the totalnumber of meds that the patient has reviewed both med and other meds
        const medsList = []
        let totalNumberofMedsReview = 0
        // check whether the med is review completed or not / if complete count the med.
        Object.keys(cmr).map(key => {
            if (key.includes('medication_')) {
                if (cmr[key].reviewCompleted) {
                    totalNumberofMedsReview += 1
                }
            }
        })
        // check whether the otherMed is review completed or not / if complete count the med.
        Object.keys(cmr).map(key => {
            if (key.includes('otherMedication')) {
                if (cmr[key].reviewCompleted) {
                   totalNumberofMedsReview += 1
                }
            }
        })

        // seperate list into 10 meds per list
        return totalNumberofMedsReview
    }


    getReviwedMedsList = () => {
        // get cmr from redux
        const { cmr } = this.props

        // create list to contain med names
        const medsList = []

        // check whether the med is review completed or not / if complete put the display name in to the array.
        Object.keys(cmr).map(key => {
            if (key.includes('medication_')) {
                if (cmr[key].reviewCompleted) {
                    medsList.push([cmr.medications.find(med => med.id === key.split('_')[1]).display,cmr.medications.find(med => med.id === key.split('_')[1]).id])
                }
            }
        })
        // check whether the otherMed is review completed or not / if complete put the display name in to the array.
        Object.keys(cmr).map(key => {
            if (key.includes('otherMedication')) {
                if (cmr[key].reviewCompleted) {
                    medsList.push([cmr[key].display, key])
                }
            }
        })

        // seperate list into 10 meds per list
        return medsList.reduce((lists, med) => {
            if (lists[lists.length - 1].length === 10) {
                lists[lists.length] = []
            }
            lists[lists.length - 1].push(med)
            return lists
        }, [[]])
    }

    render() {
        if (this.props.cmr && JSON.stringify(this.props.cmr) !== '{}') {
            this.amountMedsCompleted = countAmountMedsCompleted(this.props.cmr)
        }
        if (!this.isShowNavbar()) {
            return (<div></div>)
        }
        if (this.props.user && JSON.stringify(this.props.user) !== '{}') {
            const caregiverPages = ['/caregiver-patient-lookup', '/caregiver-patient-lookup-confirm', '/caregiver-consent']
            var isCaregiverPage = caregiverPages.indexOf(this.props.router.location.pathname) !== -1
        }
        return (
            <div className={style.wrapper}>
                {this.state.showHelpMeFinal ? (<HelpMeFinal onDone={() => this.setHelpMeFinalPopup(false)} />) : null}
                {this.state.showFAQ ? (<HelpFAQ onDone={() => this.setFAQPopup(false)} />) : null}
                <Row>
                    <Col className={style.leftSideWrapper}>

                     {this.props.patient && JSON.stringify(this.props.patient) !== '{}' ? (

                    <span>                        <a href="https://www.arine.io">
                            <img className={style.logoLogin} src={require('assets/logo.png')} alt="Arine" />
                        </a>
                        </span>) :

                        (
                        <span>
                        <a href="https://www.arine.io">
                            <img className={style.logo} src={require('assets/logo.png')} alt="Arine" />
                        </a>
                        </span>)
                     }


                        { (!this.props.cmr || (this.props.cmr && Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object)) && this.props.router.location.pathname === '/welcome-new' ? (
                           <span className={style.buttonWrapper}>
                            <Button className = {[style.btn, style.btnOutline ]} id="btnCaregiverRegistrationWelcomeNew"  onClick={ () => {this.props.push('/caregiver-register')}} >
                                    Caregiver Registration
                            </Button>
                            </span>
                        ) : null }
                        {this.props.cmr && !this.props.cmr.conversationDate && !this.props.cmr.complete && JSON.stringify(this.props.cmr) !== '{}' ? (
                            <span
                                className={style.myProgress}
                                onClick={this.toggleMyProgress}
                                onMouseLeave={this.toggleMyProgress}
                            >
                                My Progress
                                {this.state.myProgressExpand ? (<MdArrowUp className={style.arrow} />) : (<MdArrowDown className={style.arrow} />)}
                                {this.state.myProgressExpand ? (
                                    <div className={style.myProgressExpandWrapper}>
                                        <div className={style.triangle}></div>
                                        <div className={style.myProgressExpand}>
                                            <p>You have told us about <span className={style.myProgressTold}>{this.getTotalNumberofMedsReview()}</span> of your medications:</p>
                                            <div className={style.myProgessMedsListWrapper}>
                                                {this.getReviwedMedsList().map((list, index) => (
                                                    <ul key={index} className={style.myProgressMedsList}>
                                                        {list.map((med, index) => (
                                                            // <li key={index}>{med[0]}</li>
                                                            med[1].includes('otherMedication') ?
                                                            <li onClick={() => {
                                                                                  this.props.push('/meds-new-medication/'+ med[1])}
                                                                               }>
                                                                  {med[0]}
                                                            </li>:<li onClick={() => {this.props.push('/meds-verify-drug/'+ med[1])}}>
                                                                  {med[0]}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ))}
                                            </div>{
                                              this.props.cmr.medications.length - this.amountMedsCompleted == 0 ?
                                              (<div>
                                                 There are <span className={style.myProgressStill}>no more</span> medications we need to ask you about.
                                               </div>):(this.props.cmr.medications.length - this.amountMedsCompleted == 1 ?
                                               (<div>
                                                 There is <span className={style.myProgressStill}>1</span> more medication we need to ask you about.
                                               </div> ):
                                               (<div>
                                                 There are <span className={style.myProgressStill}>{this.props.cmr.medications.length - this.amountMedsCompleted}</span> medications we need to ask you about.
                                               </div>))}

                                        </div>
                                    </div>
                                ) : null}
                            </span>
                        ) : null}
                    </Col>
                    <Col className={style.rightSideWrapper}>
                         <span
                            className={style.helpMenu1}
                            onClick={this.toggleHelpMenu}
                        >
                            Help
                            {this.state.helpMenuExpand ? (<MdArrowUp className={style.arrow} />) : (<MdArrowDown className={style.arrow} />)}
                            {this.state.helpMenuExpand ? (
                                <span className={style.nav}>
                                <ul  onMouseLeave={this.toggleHelpMenu}>
                                    <li
                                        onClick={() => this.setHelpMeFinalPopup(true)}
                                    >
                                     <a>   <ContactUs className={style.icon}/>&nbsp;&nbsp;Contact Us</a>
                                    </li>

                                    <li onClick={() => this.setFAQPopup(true)}>
                                    <a>     <Faq className={style.icon}/> &nbsp;&nbsp;FAQs</a>
                                    </li>
                                </ul>
                                </span>
                                ) : null}
                        </span>

                        {isCaregiverPage && this.props.user && JSON.stringify(this.props.user) !== '{}' ? (
                            <span
                                className={style.userMenu}
                                onClick={this.toggleUserMenu}
                            >
                                <span className={style.nameCircle}>
                                <span className={style.nameCircleText}>
                                    {this.props.user.firstName[0] + this.props.user.lastName[0]}
                                    </span>
                                </span>
                                {this.state.userMenuExpand ? (<MdArrowUp className={style.arrow} />) : (<MdArrowDown className={style.arrow} />)}
                                {this.state.userMenuExpand ? (
                                    <span>
                                        <ul className={style.userMenuExpandWrapper} onMouseLeave={this.toggleUserMenu}>
                                            <li id="signout" onClick={this.signOut}>Sign Out</li>
                                        </ul>
                                    </span>
                                ) : null}
                            </span>
                        ) : null}

                        {!isCaregiverPage && this.props.patient && JSON.stringify(this.props.patient) !== '{}' ? (
                            <span
                                className={style.userMenu}
                                onClick={this.toggleUserMenu}
                            >
                                <span className={style.nameCircle}>
                                <span className={style.nameCircleText}>
                                    {this.props.patient.name[0].given[0][0] + this.props.patient.name[0].family[0]}
                                    {/* {this.props.user.firstName[0] + this.props.user.lastName[0]} */}
                                </span>
                                </span>
                                {this.state.userMenuExpand ? (<MdArrowUp className={style.UserMenuArrow} />) : (<MdArrowDown  className={style.UserMenuArrow} />)}
                                {this.state.userMenuExpand ? (
                                    <span className={style.nav}>
                                            {!this.props.cmr.complete && !this.props.cmr.conversationDate  ?(
                                              <ul  onMouseLeave={this.toggleUserMenu}>
                                              <li onClick={() => {this.props.push('/confirm-info')}}>
                                                 <a> Account Info</a>
                                              </li>
                                              <li  onClick={() => {this.props.push('/pcp-query')}}>
                                              <a>  My Care Team</a>
                                              </li>
                                              <li  onClick={() => {this.props.push('/landing-page')}}>
                                              <a>  Dashboard</a>
                                              </li>
                                              <li id="signout" onClick={this.signOut}><a> Sign Out</a> </li>
                                            </ul>):
                                            (<ul onMouseLeave={this.toggleUserMenu}>
                                                <li id="signout" onClick={this.signOut}><a> Sign Out</a>  </li>
                                            </ul>)}


                                    </span>
                                ) : null}
                            </span>
                        ) : (  isCaregiverPage || this.props.router.location.pathname == '/' || this.props.router.location.pathname == '/login') ? (
                            null
                        ) :
                        <span className={style.buttonWrapper}>
                           <Button className = {[style.btn, style.btnOutline ]} onClick={ () => {this.props.push('/login')}}>
                                Login
                            </Button>
                            </span>
                       }
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect (
    ({
        user,
        router,
        page,
        cmr,
        patients,
        patient
    }) => ({
        user,
        router,
        page,
        cmr,
        patients,
        patient
    }),
    {
        push,
        goBack,
        resetAuth
    }
)(Navbar)
