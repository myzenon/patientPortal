import React from 'react'
import { UpdatePolicies } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

jest.mock('assets/policy/nopp.html', () => '<meta charset="UTF-8">\n<meta version="v1.0">\nnopp content')
jest.mock('assets/policy/eula.html', () => '<meta charset="UTF-8">\n<meta version="v1.0">\neula content')
jest.mock('assets/policy/terms.html', () => '<meta charset="UTF-8">\n<meta version="v1.0">\nterms content')
jest.mock('assets/policy/access.html', () => '<meta charset="UTF-8">\n<meta version="v1.0">\naccess content')

test('renders correctly', () => {
    const wrapper = render (
        <UpdatePolicies />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('checkbox checked | next button enabled', () => {
    const wrapper = mount (
        <UpdatePolicies />
    )
    wrapper.find('input[type="checkbox"]').simulate('change')
    expect(toJson(wrapper.find('button').render())).toMatchSnapshot()
})

test('when user accept | usersUpdateUserPut called | move to comfirm info page', done => {
    const props = {
        patient: {
            ...mockObj.patient,
            noppStatus: false
        },
        callAPIGateway: (name, get, post) => {
            const date = new Date()
            expect(name).toBe('usersUpdateUserPut')
            expect(post).toEqual({
                'nopp': {
                    'Date': date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate(),
                    'vEnd': 'v1.0',
                    'vNopp': 'v1.0',
                    'vTerms': 'v1.0'
                },
                'noppStatus': true
            })
            return Promise.resolve()
        },
        setPatient: (patient) => {
            expect(patient).toEqual({
                ...mockObj.patient,
                noppStatus: true
            })
        },
        push: (url) => {
            expect(url).toBe('/confirm-info')
            done()
        }
    }
    const wrapper = mount (
        <UpdatePolicies {...props} />
    )
    setTimeout(() => {
        wrapper.find('input[type="checkbox"]').simulate('change')
        wrapper.update()
        wrapper.find('button[type="button"]').simulate('click')
    }, 0)
})