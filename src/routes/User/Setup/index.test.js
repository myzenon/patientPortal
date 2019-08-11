import React from 'react'
import { Setup } from './index'
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
    const props = {
        page: {
            data: {
                userIdentityVerified: true,
                insuranceId: 'insuranceId',
                birthDate: '1949-05-21',
                securityPolicy: {
                    passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\=])(?=.{8,})/,
                    passwordMsg: 'Password must be at least 8 characters long and contain at least one character, one number and one special character including !@#$%*=',
                    passwordCriteria: [
                        '8 characters',
                        'One uppercase letter',
                        'One lowercase letter',
                        'One number',
                        'One special character !@#$%^&*='
                    ]
                }
            }
        }
    }
    const wrapper = render (
        <Setup {...props} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('renders without userIdentityVerified state', (done) => {
    const props = {
        page: {
            data: {
                userIdentityVerified: false,
                insuranceId: 'insuranceId',
                birthDate: '1949-05-21',
                securityPolicy: {
                    passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\=])(?=.{8,})/,
                    passwordMsg: 'Password must be at least 8 characters long and contain at least one character, one number and one special character including !@#$%*=',
                    passwordCriteria: [
                        '8 characters',
                        'One uppercase letter',
                        'One lowercase letter',
                        'One number',
                        'One special character !@#$%^&*='
                    ]
                }
            }
        },
        push: (url) => {
            expect(url).toBe('/new-registration')
            done()
        }
    }
    mount (
        <Setup {...props} />
    )
})

test.skip('toggle switch showing password | show password between as clear text and as *******', () => {
    const props = {
        page: {
            data: {
                userIdentityVerified: true,
                insuranceId: 'insuranceId',
                birthDate: '1949-05-21',
                securityPolicy: {
                    passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\=])(?=.{8,})/,
                    passwordMsg: 'Password must be at least 8 characters long and contain at least one character, one number and one special character including !@#$%*=',
                    passwordCriteria: [
                        '8 characters',
                        'One uppercase letter',
                        'One lowercase letter',
                        'One number',
                        'One special character !@#$%^&*='
                    ]
                }
            }
        }
    }
    const wrapper = mount (
        <Setup {...props} />
    )
    wrapper.find('span[className="switch switchOff"]').simulate('click')
    expect(wrapper.find('input[name="password"]').props().type).toBe('text')
    expect(wrapper.find('input[name="rePassword"]').props().type).toBe('text')
    wrapper.find('span[className="switch switchOn"]').simulate('click')
    expect(wrapper.find('input[name="password"]').props().type).toBe('password')
    expect(wrapper.find('input[name="rePassword"]').props().type).toBe('password')
})

test('email format must be validated and errors displayed when email input field has lost focus', () => {
    const props = {
        page: {
            data: {
                userIdentityVerified: true,
                insuranceId: 'insuranceId',
                birthDate: '1949-05-21',
                securityPolicy: {
                    passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\=])(?=.{8,})/,
                    passwordMsg: 'Password must be at least 8 characters long and contain at least one character, one number and one special character including !@#$%*=',
                    passwordCriteria: [
                        '8 characters',
                        'One uppercase letter',
                        'One lowercase letter',
                        'One number',
                        'One special character !@#$%^&*='
                    ]
                }
            }
        }
    }
    const wrapper = mount (
        <Setup {...props} />
    )

    // Failure case

    wrapper.find('input[name="email"]').simulate('change', {
        target: {
            name: 'email',
            value: 'test'
        }
    })
    wrapper.find('input[name="email"]').simulate('blur')

    expect(toJson(wrapper.render())).toMatchSnapshot()

    // Success Case

    wrapper.find('input[name="email"]').simulate('change', {
        target: {
            name: 'email',
            value: 'test@test.com'
        }
    })
    wrapper.find('input[name="email"]').simulate('blur')

    expect(toJson(wrapper.render())).toMatchSnapshot()

})

test('password validation for 1st password entry box is done after user finished typing', () => {
    const props = {
        page: {
            data: {
                userIdentityVerified: true,
                insuranceId: 'insuranceId',
                birthDate: '1949-05-21',
                securityPolicy: {
                    passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\=])(?=.{8,})/,
                    passwordMsg: 'Password must be at least 8 characters long and contain at least one character, one number and one special character including !@#$%*=',
                    passwordCriteria: [
                        '8 characters',
                        'One uppercase letter',
                        'One lowercase letter',
                        'One number',
                        'One special character !@#$%^&*='
                    ]
                }
            }
        }
    }
    const wrapper = mount (
        <Setup {...props} />
    )

    // Failure case

    wrapper.find('input[name="password"]').simulate('change', {
        target: {
            name: 'password',
            value: 'test'
        }
    })
    wrapper.find('input[name="password"]').simulate('blur')

    expect(toJson(wrapper.render())).toMatchSnapshot()

    // Success Case

    wrapper.find('input[name="password"]').simulate('change', {
        target: {
            name: 'password',
            value: 'A12345678*a'
        }
    })
    wrapper.find('input[name="password"]').simulate('blur')

    expect(toJson(wrapper.render())).toMatchSnapshot()
})

test('password validation for 2nd password entry box must be done as user is typing', () => {
    const props = {
        page: {
            data: {
                userIdentityVerified: true,
                insuranceId: 'insuranceId',
                birthDate: '1949-05-21',
                securityPolicy: {
                    passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\=])(?=.{8,})/,
                    passwordMsg: 'Password must be at least 8 characters long and contain at least one character, one number and one special character including !@#$%*=',
                    passwordCriteria: [
                        '8 characters',
                        'One uppercase letter',
                        'One lowercase letter',
                        'One number',
                        'One special character !@#$%^&*='
                    ]
                }
            }
        }
    }
    const wrapper = mount (
        <Setup {...props} />
    )

    wrapper.find('input[name="password"]').simulate('change', {
        target: {
            name: 'password',
            value: 'A12345678*a'
        }
    })
    wrapper.find('input[name="password"]').simulate('blur')

    // Failure case

    wrapper.find('input[name="rePassword"]').simulate('change', {
        target: {
            name: 'rePassword',
            value: 'test'
        }
    })

    expect(toJson(wrapper.render())).toMatchSnapshot()

    // Success case

    wrapper.find('input[name="rePassword"]').simulate('change', {
        target: {
            name: 'rePassword',
            value: 'A12345678*a'
        }
    })

    expect(toJson(wrapper.render())).toMatchSnapshot()
})

test('clicks on next button | register api called | login success | save auth token | go to NOPP pages', (done) => {
    const date = new Date()
    const props = {
        page: {
            error: {
                status: null
            },
            data: {
                userIdentityVerified: true,
                insuranceId: 'insuranceId',
                birthDate: '1949-05-21',
                securityPolicy: {
                    passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\=])(?=.{8,})/,
                    passwordMsg: 'Password must be at least 8 characters long and contain at least one character, one number and one special character including !@#$%*=',
                    passwordCriteria: [
                        '8 characters',
                        'One uppercase letter',
                        'One lowercase letter',
                        'One number',
                        'One special character !@#$%^&*='
                    ]
                }
            },
            apiData: {
                ...mockObj.auth
            }
        },
        callSyncAPIGateway: (name, get, post) => {
            expect(name).toBe('usersRegisterPost')
            expect(post).toEqual({
                "email": "test@test.com",
                "insurance_id": "insuranceId",
                "password": "A12345678*a",
                "birthDate": '1949-05-21',
                "role": "user",
                "nopp": {
                    'date': date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate(),
                    'vEnd': 'v1.0',
                    'vNopp': 'v1.0',
                    'vTerms': 'v1.0',
                }
            })
            return Promise.resolve()
        },
        saveAuth: (auth) => {
            expect(auth).toEqual(mockObj.auth)
            return Promise.resolve()
        },
        apiInited: () => {
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/confirm-info')
            done()
        }
    }

    const wrapper = mount (
        <Setup {...props} />
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
    wrapper.find('input[name="rePassword"]').simulate('change', {
        target: {
            name: 'rePassword',
            value: 'A12345678*a'
        }
    })
    wrapper.find('button[type="submit"]').simulate('submit')
})

test('register API returns 409 Conflict with email already exist, display error and link to Login page', (done) => {
    const props = {
        page: {
            error: {
                status: 409,
                message: 'There is already an account with this email'
            },
            data: {
                userIdentityVerified: true,
                insuranceId: 'insuranceId',
                birthDate: '1949-05-21',
                securityPolicy: {
                    passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\=])(?=.{8,})/,
                    passwordMsg: 'Password must be at least 8 characters long and contain at least one character, one number and one special character including !@#$%*=',
                    passwordCriteria: [
                        '8 characters',
                        'One uppercase letter',
                        'One lowercase letter',
                        'One number',
                        'One special character !@#$%^&*='
                    ]
                }
            },
            apiData: null
        },
        callSyncAPIGateway: () => {
            return Promise.resolve()
        }
    }

    const wrapper = mount (
        <Setup {...props} />
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
    wrapper.find('input[name="rePassword"]').simulate('change', {
        target: {
            name: 'rePassword',
            value: 'A12345678*a'
        }
    })
    wrapper.find('button[type="submit"]').simulate('submit')
    setTimeout(() => {
        expect(toJson(wrapper.render())).toMatchSnapshot()
        done()
    }, 500)
})

test('clicks on Notice of Privacy Practices | Policies popup show', () => {
    const props = {
        page: {
            data: {
                userIdentityVerified: true,
                insuranceId: 'insuranceId',
                birthDate: '1949-05-21',
                securityPolicy: {
                    passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\=])(?=.{8,})/,
                    passwordMsg: 'Password must be at least 8 characters long and contain at least one character, one number and one special character including !@#$%*=',
                    passwordCriteria: [
                        '8 characters',
                        'One uppercase letter',
                        'One lowercase letter',
                        'One number',
                        'One special character !@#$%^&*='
                    ]
                }
            }
        }
    }
    const wrapper = mount (
        <Setup {...props} />
    )
    wrapper.find('#policies-button').simulate('click')
    expect(toJson(wrapper.render())).toMatchSnapshot()
})

test.skip('The "Create My Account" is disabled until the checkbox to accept the nopp,terms is selected', () => {
    const props = {
        page: {
            data: {
                userIdentityVerified: true,
                insuranceId: 'insuranceId',
                securityPolicy: {
                    passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\=])(?=.{8,})/,
                    passwordMsg: 'Password must be at least 8 characters long and contain at least one character, one number and one special character including !@#$%*=',
                    passwordCriteria: [
                        '8 characters',
                        'One uppercase letter',
                        'One lowercase letter',
                        'One number',
                        'One special character !@#$%^&*='
                    ]
                }
            }
        }
    }
    const wrapper = mount (
        <Setup {...props} />
    )
    expect(toJson(wrapper.find('button').render())).toMatchSnapshot()
    wrapper.find('input[type="checkbox"]').simulate('change')
    wrapper.update()
    expect(toJson(wrapper.find('button').render())).toMatchSnapshot()
})
