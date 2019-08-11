import React from 'react'
import { MedsDosingOther } from './index'

import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "y",
                dosage: { "frequency": "asNeeded" }
            }
        },
        
        match: {
            params: {
                medId: '000080833'
            }
        },
        page: {
            data: {}
        }
    }
    const wrapper = render(
        <MedsDosingOther { ...props } />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})
test.skip('medication image comes from cmr.medications[i].image.small.url', (done) => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "y",
                dosage: { "frequency": "asNeeded" }
            }
        },
        match: {
            params: {
                medId: '000080833'
            }
        },
        page: {
            data: {}
        }
    }
    const wrapper = mount(
        <MedsDosingOther { ...props } />
    )
    setTimeout(() => {
        wrapper.update()
        expect(wrapper.find('img.contentImg').props().src).toBe(mockObj.cmr.medications[0].image.small.url)
        done()
    }, 0)
})

test('medication name comes from cmr.medications[i].display', (done) => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "y",
                dosage: { "frequency": "asNeeded" }
            }
        },
        match: {
            params: {
                medId: '000080833'
            }
        },
        page: {
            data: {}
        }
    }
    const wrapper = mount(
        <MedsDosingOther { ...props } />
    )
    setTimeout(() => {
        expect(wrapper.find('.heading1').text()).toBe(mockObj.cmr.medications[0].display)
        done()
    }, 0)
})


test.skip('clicks next button without any input | api fhirCmrIdPut called | go to MedsWhatFor page', (done) => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "y",
                dosage: { "frequency": "asNeeded" }
            }
        },
        match: {
            params: {
                medId: '000080833'
            }
        },
        page: {
            data: {}
        },
        callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({"medication_000080833": {"dosage": {"description": " ", "frequency": "asNeeded"}, "taken": "y"}})
            return Promise.resolve()
        },
        savePageData: (page) => {
            expect(page).toEqual({
            })
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                medication_000080833: {
                    taken: "y",
                    dosage: {"description": " "}
                }
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/meds-what-for/000080833')
            done()
        }
    }
    const wrapper = mount(
        <MedsDosingOther  {...props} />
    )
    setTimeout(() => {
        wrapper.find('button[type="submit"]').simulate('submit')
    }, 0)
})

test.skip('clicks next button with inputting XX pills every XX hours | api fhirCmrIdPut called | go to MedsWhatFor page', (done) => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "y",
                dosage: { "frequency": "asNeeded" }
            }
        },
        match: {
            params: {
                medId: '000080833'
            }
        },
        page: {
            data: {}
        },
        savePageData: (page) => {
            expect(page).toEqual({
            })
        },
        callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                medication_000080833: {
                    taken: "y",
                    dosage: {
                            frequency: "2",
                            period: "day",
                            quantity: "6",
                            description: " "
                    }
                }
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                medication_000080833: {
                    taken: "y",
                    dosage: {
                            frequency: "2",
                            period: "day",
                            quantity: "6",
                            description: " "
                    }
                }
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/meds-what-for/000080833')
            done()
        }
    }
    const wrapper = mount(
        <MedsDosingOther  {...props} />
    )
    setTimeout(() => {
        wrapper.find('input[name="frequency"]').simulate('change', {
            target: {
                name: 'frequency',
                value: '2'
            }
        })
        wrapper.find('input[name="quantity"]').simulate('change', {
            target: {
                name: 'quantity',
                value: '6'
            }
        })
        wrapper.find('button[type="submit"]').simulate('submit')
    }, 0)
})

test.skip('clicks next button with inputting XX pills a day | api fhirCmrIdPut called | go to MedsWhatFor page', (done) => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "y",
                dosage: { "frequency": "asNeeded" }
            }
        },
        match: {
            params: {
                medId: '000080833'
            }
        },
        page: {
            data: {
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
                    dosage: {
                            frequency: "4",
                            period: "day",
                            quantity: "2",
                            description: " "
                        },
                    }
            })
            return Promise.resolve()
        },
        savePageData: (page) => {
            expect(page).toEqual({
            })
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                medication_000080833: {
                    taken: "y",
                    dosage: {
                            frequency: "4",
                            period: "day",
                            quantity: "2",
                            description: " "
                        }
                }
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/meds-what-for/000080833')
            done()
        }
    }
    const wrapper = mount(
        <MedsDosingOther {...props} />
    )
    setTimeout(() => {
        wrapper.find('input[name="quantity"]').simulate('change', {
            target: {
                name: 'quantity',
                value: '2'
            }
            })
            wrapper.find('input[name="frequency"]').simulate('change', {
                target: {
                    name: 'frequency',
                    value: '4'
                }
        })
        wrapper.find('button[type="submit"]').simulate('submit')
    }, 0)
})
