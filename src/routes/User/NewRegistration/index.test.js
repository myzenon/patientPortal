import React from 'react'
import { NewRegistration } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
    const wrapper = render (
        <NewRegistration />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('clicks next button | found = true | accountExists = false', (done) => {
    const props = {
        push: (url) => {
            expect(url).toBe('/new-registration-hpid-link-confirm')
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
                found: 'true',
                accountExists: 'false'
            }
        },
        savePageData: (data) => {
            expect(data).toEqual({
                insuranceId: 'INSURANCEID'
            })
            return Promise.resolve()
        }
    }
    const wrapper = mount (
        <NewRegistration {...props} />
    )
    wrapper.find('input[name="insuranceId"]').simulate('change', {
        target: {
            name: 'insuranceId',
            value: 'insuranceId'
        }
    })
    wrapper.find('button[type="submit"]').simulate('submit')
})

test('clicks next button | found = true | accountExists = true', (done) => {
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
                found: 'true',
                accountExists: 'true'
            }
        },
        savePageData: (data) => {
            expect(data).toEqual({
                insuranceId: 'INSURANCEID'
            })
            return Promise.resolve()
        }
    }
    const wrapper = mount (
        <NewRegistration {...props} />
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
        savePageData: (data) => {
            expect(data).toEqual({
                insuranceId: 'INSURANCEID'
            })
            return Promise.resolve()
        }
    }
    const wrapper = mount (
        <NewRegistration {...props} />
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
