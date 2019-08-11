export const findUnreviewMed = (cmr) => {
    for (let medication of cmr.medications) {
        const medReview = cmr[`medication_${medication.id}`]
        if (medReview) {
            if (!medReview.reviewCompleted) {
                return medication.id
            }
        }
        else {
            return medication.id
        }
    }
    return false
}

export const findMedNextPage = (cmr) => {
    /* Loop over all meds */
    for (let medication of cmr.medications) {
        const medReview = cmr[`medication_${medication.id}`]
        /* Check if this med review is complete. If not get the next page to view */
        if (medReview) {
            if (medReview.taken === 'y') {
                if (!medReview.dosage) {
                    return '/meds-dosing-regimen/' + medication.id
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

export const countAmountMedsCompleted = (cmr) => {
    return cmr.medications.reduce((sum, medication) => {
        const medReview = cmr[`medication_${medication.id}`]
        if (medReview && medReview.reviewCompleted) {
            return sum + 1
        }
        return sum
    }, 0)
}

export const countAmountOtherMedsCompleted = (cmr) => {
     let totalNumberofOtherMedsReview = 0
     Object.keys(cmr).map(key => {
        if (key.includes('otherMedication')) {
            if (cmr[key].reviewCompleted) {
               totalNumberofOtherMedsReview += 1
            }
        }
    })
    return totalNumberofOtherMedsReview
}

export const isReviewedMedsComplete = (cmr) => countAmountMedsCompleted(cmr) === cmr.medications.length

export const findSmartQuestionNextPage = (cmr) => {

    const findLastSmartQuestionIndex = (cmr) => {
        const { smartQuestions } = cmr
        let pageIndex = -1
        smartQuestions.forEach((page) => {
            const pageQuestionRemain = page.items.filter(question => cmr[`smartQuestion_${question.id}`] === undefined).length
            if (pageQuestionRemain > 0) {
                if (pageIndex === -1) {
                    pageIndex = page.page
                }
            }
        })
        return pageIndex
    }

    const amountSmartQuestionsReviewed = Object.keys(cmr).reduce((sum, key) => key.includes('smartQuestion_') ? sum + 1 : sum, 0)

    if (amountSmartQuestionsReviewed > 0) {
        return '/smart-questions/hedis/' + findLastSmartQuestionIndex(cmr)
    }
    else {
        return '/hedis-check-in'
    }

}
