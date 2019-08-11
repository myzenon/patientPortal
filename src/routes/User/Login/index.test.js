import React from 'react'
import { Login } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
    const wrapper = render (
        <Login />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('clicks on "Sign In" button | call login api', (done) => {
    const mockEmail = 'test@test.com'
    const mockPassword = 'A12345678*a'
    const props = {
        login: (email, password) => {
            expect(email).toBe(mockEmail)
            expect(password).toBe(mockPassword)
            done()
            return Promise.resolve()
        },
        page: {
            error: {
                status: null
            }
        }
    }
    const wrapper = mount (
        <Login {...props} />
    )
    wrapper.find('input[name="email"]').simulate('change', {
        target: {
            name: 'email',
            value: mockEmail
        }
    })
    wrapper.find('input[name="password"]').simulate('change', {
        target: {
            name: 'password',
            value: mockPassword
        }
    })
    wrapper.find('button[type="submit"]').simulate('submit')
})

test('login failed | email or password incorrect', (done) => {
    const props = {
        login: () => Promise.resolve(),
        page: {
            error: {
                status: 401
            }
        }
    }
    const wrapper = mount (
        <Login {...props} />
    )
    wrapper.find('input[name="email"]').simulate('change', {
        target: {
            name: 'email',
            value: 'test@test.com'
        }
    })
    wrapper.find('input[name="password"]').simulate('change', {
        target: {
            name: 'password',
            value: 'A12345678*a'
        }
    })
    wrapper.find('button[type="submit"]').simulate('submit')
    setTimeout(() => {
        expect(toJson(wrapper.render())).toMatchSnapshot()
        done()
    }, 0) 
})