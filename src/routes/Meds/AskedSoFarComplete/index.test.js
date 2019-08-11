import React from 'react'
import { AskedSoFarComplete } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
    const props = {
        patient: {
            ...mockObj.patient
        },
        cmr: {
            ...mockObj.cmr
        }
    }
    const wrapper = render(
        <AskedSoFarComplete { ...props } />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})