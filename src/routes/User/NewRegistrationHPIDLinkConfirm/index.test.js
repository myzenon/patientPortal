import React from 'react'
import { NewRegistrationHPIDLinkConfirm } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
    const props = {
        page: {
            data: {
                insuranceId: 'insuranceId'
            }
        }
    }
    const wrapper = render (
        <NewRegistrationHPIDLinkConfirm {...props} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('renders without HPID', (done) => {
    const props = {
        page: {
            data: {}
        },
        push: (url) => {
            expect(url).toBe('/new-registration')
            done()
        }
    }
    mount (
        <NewRegistrationHPIDLinkConfirm {...props} />
    )
})

test('validation when user typing in entry box and error displayed', () => {
    const props = {
        page: {
            data: {
                insuranceId: 'insuranceId'
            }
        },
    }
    const wrapper = mount (
        <NewRegistrationHPIDLinkConfirm {...props} />
    )
    wrapper.find('select[name="month"]').simulate('change', {
        target: {
            name: 'month',
            value: ''
        }
    })
    wrapper.find('select[name="day"]').simulate('change', {
        target: {
            name: 'day',
            value: ''
        }
    })
    wrapper.find('select[name="year"]').simulate('change', {
        target: {
            name: 'year',
            value: ''
        }
    })
    expect(toJson(wrapper.render())).toMatchSnapshot()
})

test('clicks next button | verified = true', (done) => {
    const props = {
        page: {
            data: {
                insuranceId: 'insuranceId'
            },
            apiData: {
                verified: 'true',
                securityPolicy: 'securityPattern'
            }
        },
        callSyncAPIGateway: (name, get, post) => {
            expect(name).toBe('usersVerifyPatientPost')
            expect(post).toEqual({
                "date_of_birth": "1990-09-12",
                "insurance_id": "insuranceId"
            })
            return Promise.resolve()
        },
        savePageData: (data) => {
            expect(data).toEqual({
                "birthDate": "1990-09-12",
                "insuranceId": "insuranceId",
                "securityPolicy": 'securityPattern',
                "userIdentityVerified": true
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/setup')
            done()
        }
    }
    const wrapper = mount (
        <NewRegistrationHPIDLinkConfirm {...props} />
    )
    wrapper.find('select[name="month"]').simulate('change', {
        target: {
            name: 'month',
            value: '09'
        }
    })
    wrapper.find('select[name="day"]').simulate('change', {
        target: {
            name: 'day',
            value: '12'
        }
    })
    wrapper.find('select[name="year"]').simulate('change', {
        target: {
            name: 'year',
            value: '1990'
        }
    })
    wrapper.find('button[type="submit"]').simulate('submit')
})

test('clicks next button | verified = false', (done) => {
    const props = {
        page: {
            data: {
                insuranceId: 'insuranceId'
            },
            apiData: {
                verified: 'false'
            }
        },
        callSyncAPIGateway: (name, get, post) => {
            expect(name).toBe('usersVerifyPatientPost')
            expect(post).toEqual({
                "date_of_birth": "1990-09-12",
                "insurance_id": "insuranceId"
            })
            return Promise.resolve()
        }
    }
    const wrapper = mount (
        <NewRegistrationHPIDLinkConfirm {...props} />
    )
    wrapper.find('select[name="month"]').simulate('change', {
        target: {
            name: 'month',
            value: '09'
        }
    })
    wrapper.find('select[name="day"]').simulate('change', {
        target: {
            name: 'day',
            value: '12'
        }
    })
    wrapper.find('select[name="year"]').simulate('change', {
        target: {
            name: 'year',
            value: '1990'
        }
    })
    wrapper.find('button[type="submit"]').simulate('submit')
    setTimeout(() => {
        expect(toJson(wrapper.render())).toMatchSnapshot()
        done()
    }, 0)
})
