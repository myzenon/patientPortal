import React from 'react'
import { CaregiverRegister } from './index'
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

const propsFromRedux = {
    page: {
        apiData: {
            passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\=])(?=.{8,})/,
            passwordMsg: 'Password must be at least 8 characters long and contain at least one character, one number and one special characters including !@#$%*=',
            passwordCriteria: [
                '8 characters',
                'One uppercase letter',
                'One lowercase letter',
                'One number',
                'One special character !@#$%^&*='
            ]
        }
    },
    callSyncAPIGateway: () => Promise.resolve()
}

test('renders correctly', done => {
    const props = {
        ...propsFromRedux,
    }
    const wrapper = mount (
        <CaregiverRegister {...props} />
    )
    setTimeout(() => {
        expect(toJson(wrapper.render())).toMatchSnapshot()
        done()
    }, 0)
})

// test('toggle switch showing password | show password between as clear text and as *******', done => {
//     const props = {
//         ...propsFromRedux,
//     }
//     const wrapper = mount (
//         <CaregiverRegister {...props} />
//     )
//     setTimeout(() => {
//         wrapper.find('span[className="switch switchOff"]').simulate('click')
//         expect(wrapper.find('input[name="password"]').props().type).toBe('text')
//         expect(wrapper.find('input[name="rePassword"]').props().type).toBe('text')
//         wrapper.find('span[className="switch switchOn"]').simulate('click')
//         expect(wrapper.find('input[name="password"]').props().type).toBe('password')
//         expect(wrapper.find('input[name="rePassword"]').props().type).toBe('password')
//         done()
//     }, 0)
// })

test('validate firstName', done => {
    const props = {
        ...propsFromRedux
    }
    const wrapper = mount (
        <CaregiverRegister {...props} />
    )

    setTimeout(() => {
        wrapper.update()

        // Failure case
        wrapper.find('input[name="firstName"]').simulate('change', {
            target: {
                name: 'firstName',
                value: ''
            }
        })
        wrapper.find('input[name="firstName"]').simulate('blur')

        expect(toJson(wrapper.find('.textError').render())).toMatchSnapshot()

        // Success Case

        wrapper.find('input[name="firstName"]').simulate('change', {
            target: {
                name: 'firstName',
                value: 'firstName'
            }
        })
        wrapper.find('input[name="firstName"]').simulate('blur')

        expect(wrapper.find('.textError').length).toBe(0)

        done()
    }, 0)

})

test('validate lastName', done => {
    const props = {
        ...propsFromRedux
    }
    const wrapper = mount (
        <CaregiverRegister {...props} />
    )

    setTimeout(() => {
        wrapper.update()

        // Failure case
        wrapper.find('input[name="lastName"]').simulate('change', {
            target: {
                name: 'lastName',
                value: ''
            }
        })
        wrapper.find('input[name="lastName"]').simulate('blur')

        expect(toJson(wrapper.find('.textError').render())).toMatchSnapshot()

        // Success Case

        wrapper.find('input[name="lastName"]').simulate('change', {
            target: {
                name: 'lastName',
                value: 'lastName'
            }
        })
        wrapper.find('input[name="lastName"]').simulate('blur')

        expect(wrapper.find('.textError').length).toBe(0)

        done()
    }, 0)

})

test('email format must be validated and errors displayed when email input field has lost focus', done => {
    const props = {
        ...propsFromRedux
    }
    const wrapper = mount (
        <CaregiverRegister {...props} />
    )

    setTimeout(() => {
        wrapper.update()

        // Failure case
        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: 'email',
                value: 'test'
            }
        })
        wrapper.find('input[name="email"]').simulate('blur')

        expect(toJson(wrapper.find('.textError').render())).toMatchSnapshot()

        // Success Case

        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: 'email',
                value: 'test@test.com'
            }
        })
        wrapper.find('input[name="email"]').simulate('blur')

        expect(wrapper.find('.textError').length).toBe(0)

        done()
    }, 0)

})

test('password validation for 1st password entry box is done after user finished typing', done => {
    const props = {
        ...propsFromRedux
    }
    const wrapper = mount (
        <CaregiverRegister {...props} />
    )
    setTimeout(() => {
        wrapper.update()
        // Failure case

        wrapper.find('input[name="password"]').simulate('change', {
            target: {
                name: 'password',
                value: 'test'
            }
        })
        wrapper.find('input[name="password"]').simulate('blur')

        expect(toJson(wrapper.find('.textError').render())).toMatchSnapshot()

        // Success Case

        wrapper.find('input[name="password"]').simulate('change', {
            target: {
                name: 'password',
                value: 'A12345678*a'
            }
        })
        wrapper.find('input[name="password"]').simulate('blur')

        expect(wrapper.find('.textError').length).toBe(0)
        done()
    }, 0)
})

test('password validation for 2nd password entry box must be done as user is typing', done => {
    const props = {
        ...propsFromRedux
    }
    const wrapper = mount (
        <CaregiverRegister {...props} />
    )

    setTimeout(() => {
        wrapper.update()

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

        expect(toJson(wrapper.find('.textError').render())).toMatchSnapshot()

        // Success case

        wrapper.find('input[name="rePassword"]').simulate('change', {
            target: {
                name: 'rePassword',
                value: 'A12345678*a'
            }
        })

        expect(wrapper.find('.textError').length).toBe(0)
        done()
    }, 0)
})

test('clicks on next button | register api called | login success | save auth token | go to NOPP pages', (done) => {
    const date = new Date()
    const props = {
        ...propsFromRedux,
        page: {
            ...propsFromRedux.page,
            apiData: {
                ...propsFromRedux.page.apiData,
            },
            error: {
                status: null
            }
        },
        callSyncAPIGateway: (name, get, post) => {
            if (name === 'usersOrganizationPolicyIdGet') {
                return Promise.resolve()
            }
            expect(name).toBe('usersRegisterPost')
            expect(post).toEqual({
                "email": "test@test.com",
                "firstName": "firstName",
                "lastName": "lastName",
                "password": "A12345678*a",
                "role": "user",
                "nopp": {
                    'date': date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate(),
                    'vEnd': 'v1.0',
                    'vNopp': 'v1.0',
                    'vTerms': 'v1.0',
                }
            })
            props.page.apiData = {...mockObj.auth}
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
            expect(url).toBe('/caregiver-patient-lookup')
            done()
        }
    }

    const wrapper = mount (
        <CaregiverRegister {...props} />
    )

    setTimeout(() => {
        wrapper.update()
        wrapper.find('input[name="firstName"]').simulate('change', {
            target: {
                name: 'firstName',
                value: 'firstName'
            }
        })
        wrapper.find('input[name="lastName"]').simulate('change', {
            target: {
                name: 'lastName',
                value: 'lastName'
            }
        })
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
    }, 0)
})

test('register API returns 409 Conflict, display error and link to Login page', (done) => {
    const props = {
        ...propsFromRedux,
        page: {
            ...propsFromRedux.page,
            apiData: {
                ...propsFromRedux.page.apiData,
            },
            error: {
                status: 409
            }
        },
        callSyncAPIGateway: () => {
            return Promise.resolve()
        }
    }

    const wrapper = mount (
        <CaregiverRegister {...props} />
    )

    setTimeout(() => {
        wrapper.update()
        wrapper.find('input[name="firstName"]').simulate('change', {
            target: {
                name: 'firstName',
                value: 'firstName'
            }
        })
        wrapper.find('input[name="lastName"]').simulate('change', {
            target: {
                name: 'lastName',
                value: 'lastName'
            }
        })
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
            wrapper.update()
            expect(toJson(wrapper.find('.textError').render())).toMatchSnapshot()
            done()
        }, 500)
    }, 0)
})

test('clicks on Notice of Privacy Practices | Policies popup show', done => {
    const props = {
        ...propsFromRedux
    }
    const wrapper = mount (
        <CaregiverRegister {...props} />
    )
    setTimeout(() => {
        wrapper.update()
        wrapper.find('#policies-button').simulate('click')
        expect(wrapper.find('.policyWrapper').length).toBe(1)
        done()
    }, 0)
})

test.skip('The "Create Caregiver Account" is disabled until the checkbox to accept the nopp,terms is selected', done => {
    const props = {
        ...propsFromRedux
    }
    const wrapper = mount (
        <CaregiverRegister {...props} />
    )
    setTimeout(() => {
        wrapper.update()
        expect(toJson(wrapper.find('button').render())).toMatchSnapshot()
        wrapper.find('input[type="checkbox"]').simulate('change')
        wrapper.update()
        expect(toJson(wrapper.find('button').render())).toMatchSnapshot()
        done()
    }, 0)
})
