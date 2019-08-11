import React from 'react'
import { CaregiverPatientLookup } from './index'
import ReactGA from 'react-ga';
import moment from 'moment'

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
    const wrapper = render (
        <CaregiverPatientLookup />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('clicks next button | found = true', (done) => {
    const props = {
        push: (url) => {
            expect(url).toBe('/caregiver-patient-lookup-confirm')
            done()
        },
        callSyncAPIGateway: (name, get, post) => {
            expect(name).toBe('usersLookupInsuranceIdPost')
            expect(post).toEqual({
                insurance_id: 'INSURANCEID'
            })
            return Promise.resolve()
        },
        page: {
            apiData: {
                found: 'true'
            }
        },
        patients: [...mockObj.patients],
        savePageData: (data) => {
            expect(data).toEqual({
                insuranceId: 'INSURANCEID'
            })
            return Promise.resolve()
        }
    }
    const wrapper = mount (
        <CaregiverPatientLookup {...props} />
    )
    wrapper.find('input[name="insuranceId"]').simulate('change', {
        target: {
            name: 'insuranceId',
            value: 'insuranceId'
        }
    })
    wrapper.find('button[type="submit"]').simulate('submit')
})

test('clicks next button | found = false', (done) => {
    const props = {
        callSyncAPIGateway: (name, get, post) => {
            expect(name).toBe('usersLookupInsuranceIdPost')
            expect(post).toEqual({
                insurance_id: 'INSURANCEID'
            })
            return Promise.resolve()
        },
        page: {
            apiData: {
                found: 'false'
            }
        },
        patients: [...mockObj.patients],
        savePageData: (data) => {
            expect(data).toEqual({
                insuranceId: 'INSURANCEID'
            })
            return Promise.resolve()
        }
    }
    const wrapper = mount (
        <CaregiverPatientLookup {...props} />
    )
    wrapper.find('input[name="insuranceId"]').simulate('change', {
        target: {
            name: 'insuranceId',
            value: 'insuranceId'
        }
    })
    wrapper.find('button[type="submit"]').simulate('submit')
    setTimeout(function () {
        expect(toJson(wrapper.render())).toMatchSnapshot()
        done()
    }, 0)
})

test('patient is given consent already | call fhirPatientsIdGet and fhirCmrGet API | go to /confirm-info', done => {
    const props = {
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
            apiData: {
                someData: 'someData'
            }
        },
        user: {...mockObj.patient},
        patients: [...mockObj.patients],
        setPatient: (patient) => {
            expect(patient).toEqual(props.page.apiData)
            return Promise.resolve({})
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual(props.page.apiData)
            return Promise.resolve({})
        },
        callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirPatientsIdPut')
            // expect(post).toEqual({
            //     id: 'b70f3cbe-ddd3-4ce3-96b2-914a609abd53'
            //     // lastReviewDate: moment().utc().format('YYYY-MM-DDTHH:mm:ss')
            // })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/confirm-info')
            done()
        }
    }
    const wrapper = mount (
        <CaregiverPatientLookup {...props} />
    )
    wrapper.find('input[name="insuranceId"]').simulate('change', {
        target: {
            name: 'insuranceId',
            value: mockObj.patients[0].insuranceId
        }
    })
    wrapper.find('button[type="submit"]').simulate('submit')
})
