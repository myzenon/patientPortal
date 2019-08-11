import React from 'react'
import { MedsDosingFrequency } from './index'
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
                taken: "n",
                reasonNotTaken: {},
            }
        },
        match: {
            params: {
                medId: '000080833'
            }
        }
    }
    const wrapper = render(
        <MedsDosingFrequency { ...props } />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test.skip('clicks NEXT button with input the questions | api fhirCmrIdPut | go to Meds 2 Verify Drug', (done) => {
    const mockQuestions = "Can I have this pill with meal ?"
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "n",
                reasonNotTaken: {}
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
                    taken: "n",
                    reasonNotTaken: {},
                    question: mockQuestions,
                    reviewCompleted: true
                }
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                medication_000080833: {
                    taken: "n",
                    reasonNotTaken: {},
                    question: mockQuestions,
                    reviewCompleted: true
                }
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/meds-verify-drug/000293159')
            done()
        }
    }
    const wrapper = mount(
        <MedsDosingFrequency  { ...props } />
    )
    setTimeout(() => {
        wrapper.find('textarea[type="text"]').simulate('change', {
            target: {
                name: 'question',
                value: mockQuestions
            }
        })
        wrapper.find('button').simulate('click')
    }, 0)
})

test.skip('clicks NEXT button without input the questions | api fhirCmrIdPut | go to Meds 2 Verify Drug', (done) => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "n",
                reasonNotTaken: {}
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
                    taken: "n",
                    reasonNotTaken: {},
                    reviewCompleted: true
                }
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                medication_000080833: {
                    taken: "n",
                    reasonNotTaken: {},
                    reviewCompleted: true
                }
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/meds-verify-drug/000293159')
            done()
        }
    }
    const wrapper = mount(
        <MedsDosingFrequency  { ...props } />
    )
    setTimeout(() => {
        wrapper.find('button').simulate('click')
    }, 0)
})

test.skip('clicks NEXT button goes to OtherMeds | all meds are completed', (done) => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "n",
                reasonNotTaken: {},
                reviewCompleted: true
            },
            medication_000293159: {
                taken: "n",
                reasonNotTaken: {},
                reviewCompleted: true
            },
            medication_000493990: {
                taken: "n",
                reasonNotTaken: {},
                reviewCompleted: true
            },
            medication_000747126: {
                taken: "n",
                reasonNotTaken: {},
                reviewCompleted: true
            },
            medication_665820312: {
                taken: "n",
                reasonNotTaken: {},
            },
        },
        match: {
            params: {
                medId: '665820312'
            }
        },
        callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                medication_665820312: {
                    taken: "n",
                    reasonNotTaken: {},
                    reviewCompleted: true
                }
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                medication_000080833: {
                    taken: "n",
                    reasonNotTaken: {},
                    reviewCompleted: true
                },
                medication_000293159: {
                    taken: "n",
                    reasonNotTaken: {},
                    reviewCompleted: true
                },
                medication_000493990: {
                    taken: "n",
                    reasonNotTaken: {},
                    reviewCompleted: true
                },
                medication_000747126: {
                    taken: "n",
                    reasonNotTaken: {},
                    reviewCompleted: true
                },
                medication_665820312: {
                    taken: "n",
                    reasonNotTaken: {},
                    reviewCompleted: true
                }
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/prepare/Chapter3')
            done()
        }
    }
    const wrapper = mount(
        <MedsDosingFrequency { ...props } />
    )
    setTimeout(() => {
        wrapper.find('button').simulate('click')
    }, 0)
})
