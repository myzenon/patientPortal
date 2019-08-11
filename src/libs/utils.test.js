import * as utilsFunction from './utils'

test('findUnreviewMed 1 | return first med id', () => {
    const cmr = { ...mockObj.cmr }
    Object.keys(cmr).forEach(key => {
        if (key.includes('medication_')) {
            delete cmr[key]
        }
    })
    expect(utilsFunction.findUnreviewMed(cmr)).toBe(cmr.medications[0].id)
})

test('findUnreviewMed 2 | return third med id', () => {
    const cmr = { ...mockObj.cmr }
    cmr.medications.forEach((medication, index) => {
        if (index < cmr.medications.length - 3) {
            cmr[`medication_${medication.id}`] = {
                reviewCompleted: true
            }
        }
    })
    expect(utilsFunction.findUnreviewMed(cmr)).toBe(cmr.medications[2].id)
})

test('findUnreviewMed 3 | return false', () => {
    const cmr = { ...mockObj.cmr }
    cmr.medications.forEach(medication => {
        cmr[`medication_${medication.id}`] = {
            reviewCompleted: true
        }
    })
    expect(utilsFunction.findUnreviewMed(cmr)).toBe(false)
})

test('findMedNextPage 1 | meds-verify-drug ', () => {
    const cmr = { ...mockObj.cmr }
    cmr.medications.forEach((medication, index) => {
        if (index < cmr.medications.length - 3) {
            cmr[`medication_${medication.id}`] = {
                taken: 'n',
                reasonNotTaken: {},
                reviewCompleted: true
            }
        }
    })
    expect(utilsFunction.findMedNextPage(cmr)).toBe('/meds-verify-drug/' + cmr.medications[2].id)
})

test('findMedNextPage 2 | meds-dosing-regimen', () => {
    const cmr = { ...mockObj.cmr }
    cmr.medications.forEach((medication, index) => {
        if (index < cmr.medications.length - 3) {
            cmr[`medication_${medication.id}`] = {
                taken: 'n',
                reasonNotTaken: {},
                reviewCompleted: true
            }
        }
        if (index === cmr.medications.length - 3) {
            cmr[`medication_${medication.id}`] = {
                taken: 'y',
            }
        }
    })
    expect(utilsFunction.findMedNextPage(cmr)).toBe('/meds-dosing-regimen/' + cmr.medications[2].id)
})

test('findMedNextPage 3 | meds-what-for', () => {
    const cmr = { ...mockObj.cmr }
    cmr.medications.forEach((medication, index) => {
        if (index < cmr.medications.length - 3) {
            cmr[`medication_${medication.id}`] = {
                taken: 'n',
                reasonNotTaken: {},
                reviewCompleted: true
            }
        }
        if (index === cmr.medications.length - 3) {
            cmr[`medication_${medication.id}`] = {
                taken: 'y',
                dosage: {}
            }
        }
    })
    expect(utilsFunction.findMedNextPage(cmr)).toBe('/meds-what-for/' + cmr.medications[2].id)
})

test('findMedNextPage 4 | meds-why-stopped', () => {
    const cmr = { ...mockObj.cmr }
    cmr.medications.forEach((medication, index) => {
        if (index < cmr.medications.length - 3) {
            cmr[`medication_${medication.id}`] = {
                taken: 'n',
                reasonNotTaken: {},
                reviewCompleted: true
            }
        }
        if (index === cmr.medications.length - 3) {
            cmr[`medication_${medication.id}`] = {
                taken: 'n',
            }
        }
    })
    expect(utilsFunction.findMedNextPage(cmr)).toBe('/meds-why-stopped/' + cmr.medications[2].id)
})

test('findMedNextPage 5 | taken === n meds-any-other-questions', () => {
    const cmr = { ...mockObj.cmr }
    cmr.medications.forEach((medication, index) => {
        if (index < cmr.medications.length - 3) {
            cmr[`medication_${medication.id}`] = {
                taken: 'n',
                reasonNotTaken: {},
                reviewCompleted: true
            }
        }
        if (index === cmr.medications.length - 3) {
            cmr[`medication_${medication.id}`] = {
                taken: 'n',
                reasonNotTaken: {}
            }
        }
    })
    expect(utilsFunction.findMedNextPage(cmr)).toBe('/meds-any-other-questions/' + cmr.medications[2].id)
})

test('findMedNextPage 6 | taken === y meds-any-other-questions', () => {
    const cmr = { ...mockObj.cmr }
    cmr.medications.forEach((medication, index) => {
        if (index < cmr.medications.length - 3) {
            cmr[`medication_${medication.id}`] = {
                taken: 'n',
                reasonNotTaken: {},
                reviewCompleted: true
            }
        }
        if (index === cmr.medications.length - 3) {
            cmr[`medication_${medication.id}`] = {
                taken: 'y',
                dosage: {},
                reasonCode: {}
            }
        }
    })
    expect(utilsFunction.findMedNextPage(cmr)).toBe('/meds-any-other-questions/' + cmr.medications[2].id)
})

test('findMedNextPage 7| meds-other-meds', () => {
    const cmr = { ...mockObj.cmr }
    cmr.medications.forEach((medication) => {
        cmr[`medication_${medication.id}`] = {
            taken: 'n',
            reasonNotTaken: {},
            reviewCompleted: true
        }
    })
    expect(utilsFunction.findMedNextPage(cmr)).toBe('/meds-other-meds')
})

test('countAmountMedsCompleted 1 | return 5', () => {
    const cmr = { ...mockObj.cmr }
    cmr.medications.forEach((medication) => {
        cmr[`medication_${medication.id}`] = {
            taken: 'n',
            reasonNotTaken: {},
            reviewCompleted: true
        }
    })
    expect(utilsFunction.countAmountMedsCompleted(cmr)).toBe(5)
})

test('countAmountMedsCompleted 2 | return 3', () => {
    const cmr = { ...mockObj.cmr }
    cmr.medications.forEach((medication, index) => {
        if (index < cmr.medications.length - 2) {
            cmr[`medication_${medication.id}`] = {
                taken: 'n',
                reasonNotTaken: {},
                reviewCompleted: true
            }
        }
    })
    expect(utilsFunction.countAmountMedsCompleted(cmr)).toBe(3)
})

test('countAmountMedsCompleted 3 | return 0', () => {
    const cmr = { ...mockObj.cmr }
    expect(utilsFunction.countAmountMedsCompleted(cmr)).toBe(0)
})

test('isReviewedMedsComplete | return false', () => {
    const cmr = { ...mockObj.cmr }
    expect(utilsFunction.isReviewedMedsComplete(cmr)).toBe(false)
})

test('isReviewedMedsComplete 2 | complete some med return false', () => {
    const cmr = { ...mockObj.cmr }
    cmr.medications.forEach((medication, index) => {
        if (index < cmr.medications.length - 2) {
            cmr[`medication_${medication.id}`] = {
                taken: 'n',
                reasonNotTaken: {},
                reviewCompleted: true
            }
        }
    })
    expect(utilsFunction.isReviewedMedsComplete(cmr)).toBe(false)
})

test('isReviewedMedsComplete 3 | return true', () => {
    const cmr = { ...mockObj.cmr }
    cmr.medications.forEach((medication) => {
        cmr[`medication_${medication.id}`] = {
            taken: 'n',
            reasonNotTaken: {},
            reviewCompleted: true
        }
    })
    expect(utilsFunction.isReviewedMedsComplete(cmr)).toBe(true)
})

test('findSmartQuestionNextPage 1 | smart-questions/hedis/4', () => {
    const cmr = { ...mockObj.cmr }
    cmr.smartQuestions.forEach((smartQuestion, index) => {
        if (index < cmr.smartQuestions.length - 2) {
            smartQuestion.items.forEach((question) => {
                cmr[`smartQuestion_${question.id}`] = {}
            })
        }
    })
    expect(utilsFunction.findSmartQuestionNextPage(cmr)).toBe('/smart-questions/hedis/4')
})

test('findSmartQuestionNextPage 2 | smart-questions/hedis/2', () => {
    const cmr = { ...mockObj.cmr }
    cmr.smartQuestions.forEach((smartQuestion, index) => {
        if (index < cmr.smartQuestions.length - 4) {
            smartQuestion.items.forEach((question) => {
                cmr[`smartQuestion_${question.id}`] = {}
            })
        }
    })
    expect(utilsFunction.findSmartQuestionNextPage(cmr)).toBe('/smart-questions/hedis/2')
})

test('findSmartQuestionNextPage 3 | hedis-check-in', () => {
    const cmr = { ...mockObj.cmr }
    expect(utilsFunction.findSmartQuestionNextPage(cmr)).toBe('/hedis-check-in')
})