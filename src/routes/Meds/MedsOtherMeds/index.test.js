import React from 'react'
import { MedsOtherMeds } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "n",
                reasonNotTaken: {},
                reviewCompleted: true
            },
            medication_000293159: {
                taken: "n",
                reasonNotTaken: {},
                reviewCompleted: true
            },
            medication_000493990: {
                taken: "n",
                reasonNotTaken: {},
                reviewCompleted: true
            },
            medication_000747126: {
                taken: "n",
                reasonNotTaken: {},
                reviewCompleted: true
            },
            medication_665820312: {
                taken: "n",
                reasonNotTaken: {},
                reviewCompleted: true
            },
        },
        match: {
            params: {
                medId: '665820312'
            }
        },
    }
    const wrapper = render(
        <MedsOtherMeds { ...props} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('clicks yes | go to Enter new medication page', done => {
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                medId: '665820312'
            }
        },
        push: (url) => {
            expect(url).toBe('/meds-new-medication')
            done()
        }
    }
    const wrapper = mount(
        <MedsOtherMeds { ...props} />
    )
    wrapper.find('button').first().simulate('click')
})

test('clicks no | go to HEDIS Checkin page', done => {
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                medId: '665820312'
            }
        },
        callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                otherMedsCompleted: true
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                otherMedsCompleted: true
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/prepare-Chapter4')
            done()
        }
    }
    const wrapper = mount(
        <MedsOtherMeds { ...props} />
    )
    wrapper.find('button').at(1).simulate('click')
    done()
})

// test('Show previous other-med that user entered on "Enter New Medication" page.', (done) => {
//     const props = {
//         patient: {
//             ...mockObj.patient
//         },
//         cmr: {
//             ...mockObj.cmr,
//             otherMedication_1: {
//                 display: "aspirin 200mg",
//                 brandName: "aspirin",
//                 genericName: "aspirin",
//                 dosage: { "value": "200mg" },
//                 taken: "y",
//                 reasonCode: [
//                     { conditionName: "Other", description: "Headache" }
//                 ],
//                 reviewCompleted: " true"
//             },
//             otherMedsCompleted: true
//         },
//         match: {
//             params: {
//                 medId: '665820312'
//             }
//         },
//     }
//
//     const wrapper = mount(
//         <MedsOtherMeds { ...props } />
//     )
//     setTimeout(() => {
//         expect(toJson(wrapper.render())).toMatchSnapshot()
//         done()
//     }, 0)
// })

test('YES shows "Meds Dosing Regimen" page if other-med unfinished.', done => {
    const props = {
        patient: {
            ...mockObj.patient
        },
        cmr: {
            ...mockObj.cmr,
            otherMedication_1: {
                display: "aspirin 200mg",
                brandName: "aspirin",
                genericName: "aspirin",
                taken: "y",
            },
        },
        push: (url) => {
            expect(url).toBe('/meds-new-medication/otherMedication_1')
            done()
        },
        match: {
            params: {
                medId: '665820312'
            }
        },
    }

    const wrapper = mount(
        <MedsOtherMeds { ...props } />
    )
    wrapper.find('button').first().simulate('click')
})

test('YES shows "Meds Any Other Questions" page if other-med unfinished.', done => {
    const props = {
        patient: {
            ...mockObj.patient
        },
        cmr: {
            ...mockObj.cmr,
            otherMedication_1: {
                display: "aspirin 200mg",
                brandName: "aspirin",
                genericName: "aspirin",
                taken: "y",
                dosage: { "value": "200mg" },
                reasonCode: [
                    { conditionName: "Other", "description": "Headache" }
                ]
            },
        },
        push: (url) => {
            expect(url).toBe('/meds-any-other-questions/otherMedication_1')
            done()
        },
        match: {
            params: {
                medId: '665820312'
            }
        },
    }

    const wrapper = mount(
        <MedsOtherMeds { ...props } />
    )
    wrapper.find('button').first().simulate('click')
})
