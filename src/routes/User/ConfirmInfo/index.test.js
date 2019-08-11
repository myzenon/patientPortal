import React from 'react'
import { ConfirmInfo } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
    const props = {
        user: {...mockObj.patient},
        patient: {...mockObj.patient},
        page: {"data":{"chapter1Time":Date.now()}},
        savePageData: () => {
        }
    }
      const wrapper = render (
          <ConfirmInfo {...props}/>
      )
      expect(toJson(wrapper)).toMatchSnapshot()
  })
  
  test('phone entry box will be auto format as xxx-xxx-xxxx', done => {
    const props = {
        user: {...mockObj.patient},
        patient: {...mockObj.patient},
        page: {"data":{"chapter1Time":Date.now()}},
        savePageData: () => {
        }
    }
    const wrapper = mount (
        <ConfirmInfo {...props} />
    )
    setTimeout(() => {
        wrapper.find('input[name="phoneNumber"]').simulate('change', {
            target: {
                name: 'phoneNumber',
                value: '0123456789'
            }
        })
        wrapper.find('input[name="phoneNumber"]').simulate('blur')
        expect(wrapper.state().phoneNumber).toBe('012-345-6789')
        done()
    }, 0)
})

test('validation is done when entry box loses keyboard focus', done => {
    const props = {
        user: {...mockObj.patient},
        patient: {...mockObj.patient},
        page: {"data":{"chapter1Time":Date.now()}},
        savePageData: () => {
        }
    }
    const wrapper = mount (
        <ConfirmInfo {...props} />
    )
    setTimeout(() => {
        wrapper.find('input[name="address1"]').simulate('change', {
            target: {
                name: 'address1',
                value: ''
            }
        })
        wrapper.find('input[name="address1"]').simulate('blur')
        wrapper.find('input[name="city"]').simulate('change', {
            target: {
                name: 'city',
                value: ''
            }
        })
        wrapper.find('input[name="city"]').simulate('blur')
        wrapper.find('input[name="zipCode"]').simulate('change', {
            target: {
                name: 'zipCode',
                value: ''
            }
        })
        wrapper.find('input[name="zipCode"]').simulate('blur')
        wrapper.find('input[name="phoneNumber"]').simulate('change', {
            target: {
                name: 'phoneNumber',
                value: 'abc'
            }
        })
        wrapper.find('input[name="phoneNumber"]').simulate('blur')
        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: 'email',
                value: 'abc'
            }
        })
        wrapper.find('input[name="email"]').simulate('blur')
        expect(toJson(wrapper.render())).toMatchSnapshot()
        done()
    }, 0)
})

test('validation error | button disabled', done => {
    const props = {
        user: {...mockObj.patient},
        patient: {...mockObj.patient},
        page: {"data":{"chapter1Time":Date.now()}},
        savePageData: () => {
        }
    }
    const wrapper = mount (
        <ConfirmInfo {...props} />
    )
    setTimeout(() => {
        wrapper.find('input[name="address1"]').simulate('change', {
            target: {
                name: 'address1',
                value: ''
            }
        })
        wrapper.find('input[name="address1"]').simulate('blur')
        expect(toJson(wrapper.find('button[type="submit"]').render())).toMatchSnapshot()
        done()
    }, 0)
})

test('update address1 | clicks next button | api fhirPatientsIdPut called | previousConfirmedInfo === true |  go to appropriate page', done => {
    const props = {
        user: {...mockObj.patient},
        patient: {...mockObj.patient},
        page: {"data":{"chapter1Time":Date.now()}},
        savePageData: () => {
        },
        callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirPatientsIdPut')
            expect(get).toEqual({
                id: mockObj.patient.id
            })
            expect(post).toEqual({
                ...mockObj.patient,
                address: [
                    {
                        ...mockObj.patient.address[0],
                        line: [
                            'My Home'
                        ]
                    }
                ],
                confirmedInfo: true
            })
            return Promise.resolve()
        },
        setPatient: (patient) => {
            expect(patient).toEqual({
                ...mockObj.patient,
                address: [
                    {
                        ...mockObj.patient.address[0],
                        line: [
                            'My Home'
                        ]
                    }
                ],
                confirmedInfo: true
            })
            return Promise.resolve()
        },
        goToPageAfterAuth: () => {
            done()
            return Promise.resolve()
        }
    }
    const wrapper = mount (
        <ConfirmInfo {...props} />
    )
    setTimeout(() => {
        wrapper.find('input[name="address1"]').simulate('change', {
            target: {
                name: 'address1',
                value: 'My Home'
            }
        })
        wrapper.find('input[name="address1"]').simulate('blur')
        wrapper.find('button[type="submit"]').simulate('submit')
    }, 0)
})

test('clicks next button | confirmedInfo === false |  go to pcp query', done => {
    const props = {
        user: {
            ...mockObj.patient,
            confirmedInfo: false
        },
        patient: {
            ...mockObj.patient,
            confirmedInfo: false
        },
        page: {"data":{"chapter1Time":Date.now()}},
        savePageData: () => {
        },
        callAPIGateway: () => Promise.resolve(),
        setPatient: () => Promise.resolve(),
        push: (url) => {
            expect(url).toBe('/pcp-query')
            done()
        }
    }
    const wrapper = mount (
        <ConfirmInfo {...props} />
    )
    setTimeout(() => {
        wrapper.find('input[name="address1"]').simulate('change', {
            target: {
                name: 'address1',
                value: 'My Home'
            }
        })
        wrapper.find('input[name="address1"]').simulate('blur')
        wrapper.find('button[type="submit"]').simulate('submit')
    }, 0)
})
