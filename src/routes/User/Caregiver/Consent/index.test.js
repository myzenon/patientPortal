import React from 'react'
import { CaregiverConsent } from './index'

import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

const propsFromRedux = {
    page: {
        apiData: {
            firstName: 'First Name',
            last_name: 'Last Name',
            found: true
        },
        data: {
            insuranceId: 'insuranceId'
        }
    },
    patients: [...mockObj.patients],
    user: { ...mockObj.user }
}

test('renders correctly', () => {
    const props = { ...propsFromRedux }
    const wrapper = render(
        <CaregiverConsent {...props} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('found = false', done => {
    const props = {
        ...propsFromRedux,
        page: {
            ...propsFromRedux.page,
            apiData: {
                ...propsFromRedux.page.apiData,
                found: false
            }
        },
        push: (url) => {
            expect(url).toBe('/caregiver-patient-lookup')
            done()
        }
    }
    mount(
        <CaregiverConsent {...props} />
    )
})

test('patient is given consent already | call fhirPatientsIdGet and fhirCmrGet API | go to /confirm-info', done => {
    const props = {
        ...propsFromRedux,
        callSyncAPIGateway: (name, get) => {
            if (name === 'fhirPatientsIdGet') {
                expect(get).toEqual({
                    id: 'b70f3cbe-ddd3-4ce3-96b2-914a609abd53'
                })
                return Promise.resolve({})
            }
            if (name === 'fhirCmrGet') {
                expect(get).toEqual({
                    patientId: 'b70f3cbe-ddd3-4ce3-96b2-914a609abd53'
                })
                return Promise.resolve({})
            }
            return Promise.reject({})
        },
        page: {
            ...propsFromRedux.page,
            data: {
                insuranceId: mockObj.patients[0].insuranceId
            },
            apiData: {
                ...propsFromRedux.page.apiData,
                verified: 'true',
                patientId: 'patientId'
            }
        },
        setPatient: (patient) => {
            expect(patient).toEqual(props.page.apiData)
            return Promise.resolve({})
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual(props.page.apiData)
            return Promise.resolve({})
        },
        push: (url) => {
            expect(url).toBe('/confirm-info')
            done()
        }
    }
    mount(
        <CaregiverConsent {...props} />
    )
})

test('validation birth month', () => {
    const props = { ...propsFromRedux }
    const wrapper = mount(
        <CaregiverConsent {...props} />
    )
    wrapper.find('select[name="day"]').simulate('change', {
        target: {
            name: 'day',
            value: 1
        }
    })
    wrapper.find('select[name="year"]').simulate('change', {
        target: {
            name: 'year',
            value: 1950
        }
    })
    wrapper.find('button').simulate('click')
    wrapper.update()
    expect(wrapper.find('.textError').length).toBe(1)
    expect(toJson(wrapper.find('.textError').render())).toMatchSnapshot()
})

test('validation birth day', () => {
    const props = { ...propsFromRedux }
    const wrapper = mount(
        <CaregiverConsent {...props} />
    )
    wrapper.find('select[name="month"]').simulate('change', {
        target: {
            name: 'month',
            value: 1
        }
    })
    wrapper.find('select[name="year"]').simulate('change', {
        target: {
            name: 'year',
            value: 1950
        }
    })
    wrapper.find('button').simulate('click')
    wrapper.update()
    expect(wrapper.find('.textError').length).toBe(1)
    expect(toJson(wrapper.find('.textError').render())).toMatchSnapshot()
})

test('validation birth year', () => {
    const props = { ...propsFromRedux }
    const wrapper = mount(
        <CaregiverConsent {...props} />
    )
    wrapper.find('select[name="month"]').simulate('change', {
        target: {
            name: 'month',
            value: 1
        }
    })
    wrapper.find('select[name="day"]').simulate('change', {
        target: {
            name: 'day',
            value: 1
        }
    })
    wrapper.find('button').simulate('click')
    wrapper.update()
    expect(wrapper.find('.textError').length).toBe(1)
    expect(toJson(wrapper.find('.textError').render())).toMatchSnapshot()
})

test('call usersVerifyPatientPost', done => {
    const props = {
        ...propsFromRedux,
        callSyncAPIGateway: (name, get, post) => {
            expect(name).toBe('usersVerifyPatientPost')
            expect(post).toEqual({
                first_name: propsFromRedux.page.apiData.firstName,
                last_name: propsFromRedux.page.apiData.last_name,
                date_of_birth: '1950-01-01',
                insurance_id: propsFromRedux.page.data.insuranceId
            })
            done()
            return Promise.resolve({})
        }
    }
    const wrapper = mount(
        <CaregiverConsent {...props} />
    )
    wrapper.find('select[name="month"]').simulate('change', {
        target: {
            name: 'month',
            value: 1
        }
    })
    wrapper.find('select[name="day"]').simulate('change', {
        target: {
            name: 'day',
            value: 1
        }
    })
    wrapper.find('select[name="year"]').simulate('change', {
        target: {
            name: 'year',
            value: 1950
        }
    })
    wrapper.find('button').simulate('click')
})

test('call usersVerifyPatientPost | return verified false', done => {
    const props = {
        ...propsFromRedux,
        callSyncAPIGateway: (name, get, post) => {
            expect(name).toBe('usersVerifyPatientPost')
            expect(post).toEqual({
                first_name: propsFromRedux.page.apiData.firstName,
                last_name: propsFromRedux.page.apiData.last_name,
                date_of_birth: '1950-01-01',
                insurance_id: propsFromRedux.page.data.insuranceId
            })
            return Promise.resolve({})
        },
        page: {
            ...propsFromRedux.page,
            apiData: {
                ...propsFromRedux.page.apiData,
            }
        },
        setPatient: () => { },
        setCMR: () => { },
        push: () => { }
    }
    const wrapper = mount(
        <CaregiverConsent {...props} />
    )
    wrapper.find('select[name="month"]').simulate('change', {
        target: {
            name: 'month',
            value: 1
        }
    })
    wrapper.find('select[name="day"]').simulate('change', {
        target: {
            name: 'day',
            value: 1
        }
    })
    wrapper.find('select[name="year"]').simulate('change', {
        target: {
            name: 'year',
            value: 1950
        }
    })
    wrapper.find('button').simulate('click')

    setTimeout(() => {
        wrapper.update()
        expect(wrapper.find('.textError').length).toBe(1)
        expect(toJson(wrapper.find('.textError').render())).toMatchSnapshot()
        done()
    }, 0)

})

test('call usersPatientConsentPost', done => {
    const props = {
        ...propsFromRedux,
        callSyncAPIGateway: (name, get, post) => {
            if (name !== 'usersPatientConsentPost') {
                return Promise.resolve()
            }
            expect(name).toBe('usersPatientConsentPost')
            expect(post).toEqual({
                birthDate: '1950-01-01',
                insurance_id: propsFromRedux.page.data.insuranceId
            })
            done()
            return Promise.resolve({})
        },
        page: {
            ...propsFromRedux.page,
            apiData: {
                ...propsFromRedux.page.apiData,
                verified: 'true'
            }
        },
        setPatient: () => { },
        setCMR: () => { },
        push: () => { }
    }
    const wrapper = mount(
        <CaregiverConsent {...props} />
    )
    wrapper.find('select[name="month"]').simulate('change', {
        target: {
            name: 'month',
            value: 1
        }
    })
    wrapper.find('select[name="day"]').simulate('change', {
        target: {
            name: 'day',
            value: 1
        }
    })
    wrapper.find('select[name="year"]').simulate('change', {
        target: {
            name: 'year',
            value: 1950
        }
    })
    wrapper.find('button').simulate('click')
})

test('call fhirPatientsIdGet | save Patient', done => {
    const props = {
        ...propsFromRedux,
        callSyncAPIGateway: (name, get) => {
            if (name !== 'fhirPatientsIdGet') {
                return Promise.resolve()
            }
            expect(name).toBe('fhirPatientsIdGet')
            expect(get).toEqual({
                id: 'patientId'
            })
            return Promise.resolve({})
        },
        page: {
            ...propsFromRedux.page,
            apiData: {
                ...propsFromRedux.page.apiData,
                verified: 'true',
                patientId: 'patientId'
            }
        },
        setPatient: (patient) => {
            expect(patient).toEqual(props.page.apiData)
            done()
        },
        setCMR: () => { },
        push: () => { }
    }
    const wrapper = mount(
        <CaregiverConsent {...props} />
    )
    wrapper.find('select[name="month"]').simulate('change', {
        target: {
            name: 'month',
            value: 1
        }
    })
    wrapper.find('select[name="day"]').simulate('change', {
        target: {
            name: 'day',
            value: 1
        }
    })
    wrapper.find('select[name="year"]').simulate('change', {
        target: {
            name: 'year',
            value: 1950
        }
    })
    wrapper.find('button').simulate('click')
})

test('call fhirCmrGet | save CMR | go to /confirm-info ', done => {
    const props = {
        ...propsFromRedux,
        callSyncAPIGateway: (name, get) => {
            if (name !== 'fhirCmrGet') {
                return Promise.resolve()
            }
            expect(name).toBe('fhirCmrGet')
            expect(get).toEqual({
                patientId: 'patientId'
            })
            return Promise.resolve({})
        },
        page: {
            ...propsFromRedux.page,
            apiData: {
                ...propsFromRedux.page.apiData,
                verified: 'true',
                patientId: 'patientId'
            }
        },
        setPatient: () => { },
        setCMR: (cmr) => {
            expect(cmr).toEqual(props.page.apiData)

        },
        push: (url) => {
            expect(url).toBe('/confirm-info')
            done()
        }
    }
    const wrapper = mount(
        <CaregiverConsent {...props} />
    )
    wrapper.find('select[name="month"]').simulate('change', {
        target: {
            name: 'month',
            value: 1
        }
    })
    wrapper.find('select[name="day"]').simulate('change', {
        target: {
            name: 'day',
            value: 1
        }
    })
    wrapper.find('select[name="year"]').simulate('change', {
        target: {
            name: 'year',
            value: 1950
        }
    })
    wrapper.find('button').simulate('click')
})
test('call fhirPatientsIdGet', done => {
    const props = {
        ...propsFromRedux,
        callSyncAPIGateway: (name, get) => {
            if (name !== 'fhirPatientsIdGet') {
                return Promise.resolve()
            }
            expect(name).toBe('fhirPatientsIdGet')
            expect(get).toEqual({
                id: 'patientId'
            })
            return Promise.resolve({})
        },
        page: {
            ...propsFromRedux.page,
            apiData: {
                ...propsFromRedux.page.apiData,
                verified: 'true',
                patientId: 'patientId'
            }
        },
        setPatient: (patient) => {
            expect(patient).toEqual(props.page.apiData)
            done()
        },
        setCMR: () => { },
        push: () => { }
    }
    const wrapper = mount(
        <CaregiverConsent {...props} />
    )
    wrapper.find('select[name="month"]').simulate('change', {
        target: {
            name: 'month',
            value: 1
        }
    })
    wrapper.find('select[name="day"]').simulate('change', {
        target: {
            name: 'day',
            value: 1
        }
    })
    wrapper.find('select[name="year"]').simulate('change', {
        target: {
            name: 'year',
            value: 1950
        }
    })
    wrapper.find('button').simulate('click')
})
