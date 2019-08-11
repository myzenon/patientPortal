import React, { Component } from 'react'
import { Container, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import style from './style.scss'
import ProgressBarPatient from 'components/ProgressBarPatient'
import { savePageData } from 'redux/page/action'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');


export class MedsIdentifiedLanding extends Component {

    state = {
        cmr: {
            medications: []
        },
        isFirstCompleted: true
    }

    componentWillMount = () => {
        //set the state of the progress ProgressBarPatient
        this.props.savePageData({
            ShowProgressStep: 2
          })
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }

        /* gets the CMR data from redux though props */
        const cmr = this.props.cmr
        /* sets the cmr to the state and call findIsFirstCompleted function */
        this.setState({ cmr }, () => this.findIsFirstCompleted())
    }

    findIsFirstCompleted = () => {
        /* gets the length of total medications that has been reviewed (in review and completed) */
        const amountMedReviewObj = Object.keys(this.state.cmr).filter(key => key.includes('medication_')).length
        /* if amountMedReviewObj ===1 and medication is in review (not complete), sets isFirstCompleted to false */
        if (amountMedReviewObj === 1) {
            Object.keys(this.state.cmr).forEach(key => {
                if (key.includes('medication_')) {
                    if (!this.state.cmr[key].reviewCompleted) {
                        this.setState({ isFirstCompleted: false })
                    }
                }
            })
        }
    }

    getAmountReviewed = () => {
        /* get the total medications that has been reviewed (in review and completed) */
        return this.state.cmr.medications.reduce((sum, medication) => {
            const medReview = this.state.cmr[`medication_${medication.id}`]
            if (medReview && medReview.reviewCompleted) {
                return sum + 1
            }
            return sum
        }, 0)
    }
    determineNextPage = () => {
        /* Loop over all meds */
        for (let medication of this.state.cmr.medications) {
            const medReview = this.state.cmr[`medication_${medication.id}`]
            /* Check if this med review is complete. If not get the next page to view */
            if (medReview) {
                if (medReview.taken === 'y') {
                    if (!medReview.dosage) {
                        return '/meds-dosing-frequency/' + medication.id
                    }
                    if (!medReview.reasonCode) {
                        return '/meds-what-for/' + medication.id
                    }
                }
                else if (medReview.taken === 'n') {
                    if (!medReview.reasonNotTaken) {
                        return '/meds-why-stopped/' + medication.id
                    }
                }
                if (!medReview.reviewCompleted) {
                    return '/meds-any-other-questions/' + medication.id
                }
            }
            else {
                return '/meds-verify-drug/' + medication.id
            }
        }
        /* If we are still here then it means that all meds have been reviewed. We should go to the landing page for OTC meds next */
        return '/meds-other-meds'
    }

    goToNextQuestion = () => {
        this.props.push(this.determineNextPage())
    }

    render() {
        return (
                <Container fluid className={style.content}>
                    <p>
                        {this.state.isFirstCompleted ? (
                            <span>
                                Fantastic! You've told us about
                                <span className={style.numberTold}>
                                    <strong>{this.getAmountReviewed()}</strong>
                                </span>
                            </span>
                        ) : (
                                <span>
                                    You've started reviewing
                                <span className={style.numberStill}>
                                        <strong>1</strong>
                                    </span>
                                </span>
                            )}
                        of your Medications.
                    </p>
                    <p>
                        <span>
                            There are still
                        <span className={style.numberStill}>
                                <strong>{this.state.cmr.medications.length - this.getAmountReviewed()}</strong>
                            </span>
                            we'd like to talk to you about.
                        </span>
                    </p>
                    <Button
                        className={style.button}
                        onClick={this.goToNextQuestion}
                    >
                        Review my Remaining Medications
                    </Button>
                </Container>
        )
    }
}
export default connect(
    ({
        cmr
    }) => ({
            cmr
        }),
    { push,
      savePageData
     }
)(MedsIdentifiedLanding)
