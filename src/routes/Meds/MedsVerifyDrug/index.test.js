import React from 'react'
import { MedsVerifyDrug } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                medId: '000080833'
            }
        }
    }
    const wrapper = mount(
        <MedsVerifyDrug { ...props } />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('Medication image comes from cmr.medications[i].image.small.url', done => {
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                medId: '000080833'
            }
        }
    }
    const wrapper = mount(
        <MedsVerifyDrug { ...props } />
    )
    setTimeout(() => {
        wrapper.update()
        expect(wrapper.find('img.contentImg').props().src).toBe(mockObj.cmr.medications[0].image.small.url)
        done()
    }, 0)
})

test('Medication name comes from cmr.medications[i].display', (done) => {
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                medId: '000080833'
            }
        }
    }
    const wrapper = mount(
        <MedsVerifyDrug { ...props } />
    )
    setTimeout(() => {
        expect(wrapper.find('.heading1').text()).toBe(mockObj.cmr.medications[0].display)
        done()
    }, 0)
})

test.skip('clicks YES button | api fhirIdPut called | go to meds-dosing-regimen-page', (done) => {
    const props = {
        cmr: { ...mockObj.cmr },
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
                    taken: "y"
                }
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                medication_000080833: {
                    taken: "y"
                }
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/meds-dosing-regimen/000080833')
            done()
        }
    }
    const wrapper = mount(
        <MedsVerifyDrug { ...props } />
    )
    setTimeout(() => {
        wrapper.find('button#yesButton').simulate('click')
    }, 0)
})


test.skip('clicks NO button | api fhirIdPut called | go to meds-why-stopped-page', (done) => {
    const props = {
        cmr: { ...mockObj.cmr },
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
                    taken: "n"
                }
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                medication_000080833: {
                    taken: "n"
                }
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/meds-why-stopped/000080833')
            done()
        }
    }
    const wrapper = mount(
        <MedsVerifyDrug { ...props } />
    )
    setTimeout(() => {
        wrapper.find('button#noButton').simulate('click')
    }, 0)
})
