import React from 'react'
import { MedsWhyStopped } from './index'
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
                taken: "n"
            }
        },
        match: {
            params: {
                medId: '000080833'
            }
        }
    }
    const wrapper = render(
        <MedsWhyStopped { ...props } />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('NEXT button calls /fhir/cmr API | without checking any checkboxes. ReasonNotTaken attribute will be an empty json', (done) => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "n"
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
                    reasonNotTaken:{}
                }
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                medication_000080833: {
                    taken: "n",
                    reasonNotTaken:{}
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
        <MedsWhyStopped { ...props } />
    )
    setTimeout(() => {
        wrapper.update()
        wrapper.find('button').simulate('click')
    }, 0)
})
