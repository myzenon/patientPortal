import React from 'react'
import { MedsWhatFor } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test.skip('renders correctly', () => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "y",
                dosage: {}
            }
        },
        match: {
            params: {
                medId: '000080833'
            }
        }
    }
    const wrapper = render(
        <MedsWhatFor { ...props } />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test.skip('populate checkbox follows med indications', done => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "y",
                dosage: {}
            }
        },
        match: {
            params: {
                medId: '000080833'
            }
        }
    }
    const wrapper = mount(
        <MedsWhatFor { ...props } />
    )

    setTimeout(() => {
        //expect(toJson(wrapper.find('tr').render())).toMatchSnapshot()
        done()
    }, 0)
})

test('clicks next | go to meds-any-other-questions page', done => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "y",
                dosage: {}
            }
        },
        match: {
            params: {
                medId: '000080833'
            }
        },
        callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                medication_000080833: {
                    taken: "y",
                    dosage: {},
                    reasonCode: []
                }
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                medication_000080833: {
                    taken: "y",
                    dosage: {},
                    reasonCode: []
                }
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/meds-any-other-questions/000080833')
            done()
        }
    }
    const wrapper = mount(
        <MedsWhatFor { ...props } />
    )
    wrapper.find('button').simulate('click')
})


test('clicks next and there is smart question for this medication | go to smart-questions-medication', done => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000293159: {
                taken: "y",
                dosage: {}
            }
        },
        match: {
            params: {
                medId: '000293159'
            }
        },
        callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                medication_000293159: {
                    taken: "y",
                    dosage: {},
                    reasonCode: []
                }
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                medication_000293159: {
                    taken: "y",
                    dosage: {},
                    reasonCode: []
                }
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/smart-questions/medication_000293159/1')
            done()
        }
    }
    const wrapper = mount(
        <MedsWhatFor { ...props } />
    )
    wrapper.find('button').simulate('click')
})
