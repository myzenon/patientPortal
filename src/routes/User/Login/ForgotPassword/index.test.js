import React from 'react'
import { ForgotPassword } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
    const wrapper = render (
        <ForgotPassword />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('email validation on user unfocus email entry box', () => {
    const wrapper = mount (
        <ForgotPassword />
    )
    wrapper.find('input[name="email"]').simulate('change', {
        target: {
            name: 'email',
            value: 'abcde'
        }
    })
    wrapper.find('input[name="email"]').simulate('blur')
    expect(toJson(wrapper.render())).toMatchSnapshot()
})

test('clicks NEXT | api forgot password call | show Password Reset Email Has Been Sent dialog box', (done) => {
    const mockEmail = 'test@test.com'
    const props = {
        callAPIGateway: (name, get, post) => {
            expect(name).toBe('usersForgotPasswordPost')
            expect(post).toEqual({
                creds: {
                    user_name: mockEmail
                }
            })
            return Promise.resolve()
        }
    }
    const wrapper = mount (
        <ForgotPassword {...props} />
    )
    wrapper.find('input[name="email"]').simulate('change', {
        target: {
            name: 'email',
            value: mockEmail
        }
    })
    wrapper.find('input[name="email"]').simulate('blur')
    wrapper.find('button[type="submit"]').simulate('submit')
    setTimeout(() => {
        expect(toJson(wrapper.render())).toMatchSnapshot()
        done()
    }, 0)
})