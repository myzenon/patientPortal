import React from 'react'
import { HEDISCheckIn } from './index'
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
        }
    }
    const wrapper = render(
        <HEDISCheckIn  { ...props } />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('clicks Next (Smart Question is completed) | go to Prepare Chapter 5 page', (done) => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            smartQuestionsCompleted: true
        },
        push: (url) => {
            expect(url).toBe('/prepare-Chapter5')
            done()
        }
    }
    const wrapper = mount(
        <HEDISCheckIn  { ...props } />
    )
    setTimeout(() => {
        wrapper.find('button').first().simulate('click')
    }, 0)
})

test('clicks Next (Smart Question is not completed) | go to Prepare Chapter 5 page', (done) => {
    const props = {
        cmr: {
            ...mockObj.cmr,
        },
        push: (url) => {
            expect(url).toBe('/smart-questions/hedis/1')
            done()
        }
    }
    const wrapper = mount(
        <HEDISCheckIn  { ...props } />
    )
    setTimeout(() => {
        wrapper.find('button').first().simulate('click')
    }, 0)
})
