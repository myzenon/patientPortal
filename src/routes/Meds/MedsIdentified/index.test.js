import React from 'react'
import { MedsIdentified } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly | Total number of meds to review is length(cmr.medications)', () => {
    const props = {
        patient: {...mockObj.patient},
        cmr: {...mockObj.cmr}
    }
    const wrapper = mount (
        <MedsIdentified {...props} />
    )
    expect(parseInt(wrapper.find('.number p strong').text())).toBe(mockObj.cmr.medications.length)
    expect(toJson(wrapper.render())).toMatchSnapshot()
})