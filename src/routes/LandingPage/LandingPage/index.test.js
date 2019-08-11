import React from 'react'
import { LandingPage } from './index'

import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders step 1', () => {
    const props = {
        cmr: {
            ...mockObj.cmr,
        },
        patient: {
            ...mockObj.patient
        },
        user: {
            ...mockObj.user
        }
    }
    Object.keys(props.cmr).forEach(key => {
        if (key.includes('medication_')) {
            delete props.cmr[key]
        }
    })
    const wrapper = render(
        <LandingPage { ...props } />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('renders step 2', () => {
    const props = {
        cmr: {
            ...mockObj.cmr,
        },
        patient: {
            ...mockObj.patient
        },
        user: {
            ...mockObj.user
        }
    }
    props.cmr.medications.forEach(medication => {
        props.cmr[`medication_${medication.id}`] = {
            reviewCompleted: true
        }
    })
    const wrapper = render(
        <LandingPage { ...props } />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('renders step 3', () => {
    const props = {
        cmr: {
            ...mockObj.cmr,
        },
        patient: {
            ...mockObj.patient
        },
        user: {
            ...mockObj.user
        }
    }
    props.cmr.medications.forEach(medication => {
        props.cmr[`medication_${medication.id}`] = {
            reviewCompleted: true
        }
    })
    props.cmr.otherMedsCompleted = true
    const wrapper = render(
        <LandingPage { ...props } />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('renders step 4', () => {
    const props = {
        cmr: {
            ...mockObj.cmr,
        },
        patient: {
            ...mockObj.patient
        },
        user: {
            ...mockObj.user
        }
    }
    props.cmr.medications.forEach(medication => {
        props.cmr[`medication_${medication.id}`] = {
            reviewCompleted: true
        }
    })
    props.cmr.otherMedsCompleted = true
    props.cmr.smartQuestionsCompleted = true
    const wrapper = render(
        <LandingPage { ...props } />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test.skip('renders step 5', () => {
    const props = {
        cmr: {
            ...mockObj.cmr,
        },
        patient: {
            ...mockObj.patient
        },
        user: {
            ...mockObj.user
        }
    }
    props.cmr.medications.forEach(medication => {
        props.cmr[`medication_${medication.id}`] = {
            reviewCompleted: true
        }
    })
    props.cmr.otherMedsCompleted = true
    props.cmr.smartQuestionsCompleted = true
    props.patient.appointment = true
    const wrapper = render(
        <LandingPage { ...props } />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('finish button step 1', done => {
    const props = {
        cmr: {
            ...mockObj.cmr,
        },
        patient: {
            ...mockObj.patient
        },
        user: {
            ...mockObj.user
        },
        push: (url) => {
            expect(url).toBe(`/meds-verify-drug/${mockObj.cmr.medications[0].id}`)
            done()
        }
    }
    Object.keys(props.cmr).forEach(key => {
        if (key.includes('medication_')) {
            delete props.cmr[key]
        }
    })
    const wrapper = mount (
        <LandingPage { ...props } />
    )
    wrapper.find('button').simulate('click')
})

test('finish button step 2', done => {
    const props = {
        cmr: {
            ...mockObj.cmr,
        },
        patient: {
            ...mockObj.patient
        },
        user: {
            ...mockObj.user
        },
        push: (url) => {
            expect(url).toBe('/meds-other-meds')
            done()
        }
    }
    props.cmr.medications.forEach(medication => {
        props.cmr[`medication_${medication.id}`] = {
            reviewCompleted: true
        }
    })
    const wrapper = mount (
        <LandingPage { ...props } />
    )
    wrapper.find('button').simulate('click')
})

test('finish button step 3', done => {
    const props = {
        cmr: {
            ...mockObj.cmr,
        },
        patient: {
            ...mockObj.patient
        },
        user: {
            ...mockObj.user
        },
        push: (url) => {
            expect(url).toBe('/hedis-check-in')
            done()
        }
    }
    props.cmr.medications.forEach(medication => {
        props.cmr[`medication_${medication.id}`] = {
            reviewCompleted: true
        }
    })
    props.cmr.otherMedsCompleted = true
    const wrapper = mount (
        <LandingPage { ...props } />
    )
    wrapper.find('button').simulate('click')
})

test('finish button step 4', done => {
    const props = {
        cmr: {
            ...mockObj.cmr,
        },
        patient: {
            ...mockObj.patient
        },
        user: {
            ...mockObj.user
        },
        push: (url) => {
            expect(url).toBe('prepare-Chapter5')
            done()
        }
    }
    props.cmr.medications.forEach(medication => {
        props.cmr[`medication_${medication.id}`] = {
            reviewCompleted: true
        }
    })
    props.cmr.otherMedsCompleted = true
    props.cmr.smartQuestionsCompleted = true
    const wrapper = mount (
        <LandingPage { ...props } />
    )
    wrapper.find('button').simulate('click')
})

test.skip('finish button step 5', done => {
    const props = {
        cmr: {
            ...mockObj.cmr,
        },
        patient: {
            ...mockObj.patient
        },
        user: {
            ...mockObj.user
        },
        push: (url) => {
            expect(url).toBe('/appointment-scheduled')
            done()
        }
    }
    props.cmr.medications.forEach(medication => {
        props.cmr[`medication_${medication.id}`] = {
            reviewCompleted: true
        }
    })
    props.cmr.otherMedsCompleted = true
    props.cmr.smartQuestionsCompleted = true
    props.patient.appointment = true
    const wrapper = mount (
        <LandingPage { ...props } />
    )
    wrapper.find('button').simulate('click')
})
