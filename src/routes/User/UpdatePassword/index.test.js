import React from 'react'
import { UpdatePassword } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

const mockToken = 'eyJlbWFpbCI6ICJzaS56ZW5vbkBnbWFpbC5jb20iLCAicGF0aWVudF9pZCI6ICI3YzczMzBjMC1hMzIxLTRjYmEtODE1My1jMTVlOWU4N2ZiZGYiLCAib3JnX2lkIjogImY5MWIxOWQyLTU1ZTUtNDcyZC04ZTllLWFmMmIzZjcyOTIxZCJ9'
const mockCode = '480348'
const mockParams = `?token=${mockToken}&code=${mockCode}`
const mockSecurityPolicy = {
    "sessionTimeout": "15",
    "passwordExpiration": "1825",
    "passwordPattern": /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*\\=])(?=.{8,})/,
    "passwordMsg": "Password must be at least 8 characters long and contain at least one character, one number and one special character including !@#$%*="
}

test.skip('renders correctly | on page loading | call /users/organization-policy?token=xxxx&code=xxxx', (done) => {
    const props = {
        callAPIGateway: (name, get) => {
            expect(name).toBe('usersOrganizationPolicyGet')
            expect(get).toEqual({
               token: mockToken
            })
            return Promise.resolve()
        },
        router: {
            location: {
                search: mockParams
            }
        },
        page: {
            apiData: {
                ...mockSecurityPolicy
            }
        }
    }
    const wrapper = mount (
        <UpdatePassword {...props} />
    )
    setTimeout(() => {
        expect(toJson(wrapper.render())).toMatchSnapshot()
        done()
    }, 0)
})

test('no token and code parameter | redirect to login page.', done => {
    const props = {
        router: {
            location: {
                search: ''
            }
        },
        push: (url) => {
            expect(url).toBe('/login')
            done()
        }
    }
    mount (
        <UpdatePassword {...props} />
    )
})

test.skip('toggle switch showing password | show password between as clear text and as *******', (done) => {
    const props = {
        callAPIGateway: (name, get) => {
            expect(name).toBe('usersOrganizationPolicyGet')
            expect(get).toEqual({
               token: mockToken
            })
            return Promise.resolve()
        },
        router: {
            location: {
                search: mockParams
            }
        },
        page: {
            apiData: {
                ...mockSecurityPolicy
            }
        }
    }
    const wrapper = mount (
        <UpdatePassword {...props} />
    )
    setTimeout(() => {
        wrapper.update()
        wrapper.find('span[className="switch switchOff"]').simulate('click')
        expect(wrapper.find('input[name="password"]').props().type).toBe('text')
        wrapper.find('span[className="switch switchOn"]').simulate('click')
        expect(wrapper.find('input[name="password"]').props().type).toBe('password')
        done()
    }, 0)
})

test.skip('on update password | update password api called', done => {
    const mockPassword = 'A12345678*a'
    const props = {
        callAPIGateway: (name, get) => {
            expect(name).toBe('usersOrganizationPolicyGet')
            expect(get).toEqual({
               token: mockToken
            })
            return Promise.resolve()
        },
        router: {
            location: {
                search: mockParams
            }
        },
        page: {
            apiData: {
                ...mockSecurityPolicy
            }
        },
        updatePassword: (creds) => {
            expect(creds).toEqual({
                creds: {
                    token: mockToken,
                    code: mockCode,
                    password: mockPassword
                }
            })
            done()
            return Promise.resolve()
        }
    }
    const wrapper = mount (
        <UpdatePassword {...props} />
    )
    setTimeout(() => {
        wrapper.update()
        wrapper.find('input[name="password"]').simulate('change', {
            target: {
                name: 'password',
                value: mockPassword
            }
        })
        wrapper.find('button[type="submit"]').simulate('submit')
    }, 0)
})
