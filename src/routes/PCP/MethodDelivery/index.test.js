import React from 'react'
import { MethodDelivery } from './index'
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
        },
    }
    const wrapper = render(
        <MethodDelivery  { ...props } />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('clicks Next without checking the checkbox | go to final screen page', (done) => {
    const props = {
        cmr: {
            ...mockObj.cmr,
        }, callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                deliveryMethods: []
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                deliveryMethods: []
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/final-screen')
            done()
        }
    }
    const wrapper = mount(
        <MethodDelivery  { ...props } />
    )
    setTimeout(() => {
        wrapper.find('button').first().simulate('click')
    }, 0)
})


test('clicks Next with checking the checkbox | go to final screen page', (done) => {
    const props = {
        cmr: {
            ...mockObj.cmr,
        }, callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                deliveryMethods: [{ code: "mail" }]
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                deliveryMethods: [{ code: "mail" }]
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/final-screen')
            done()
        }
    }
    const wrapper = mount(
        <MethodDelivery  { ...props } />
    )
    setTimeout(() => {
        wrapper.find('input[type="checkbox"]').first().simulate('click')
        wrapper.find('button').first().simulate('click')
    }, 0)
})