import React from 'react'
import { FinalScreen } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly | Display name come from patient.name[0].given[0]', () => {
    const props = {
        patient: {...mockObj.patient},
    }
    const wrapper = mount (
        <FinalScreen {...props} />
    )
    expect(wrapper.find('.congratulations').text()).toBe('CONGRATULATIONS '+mockObj.patient.name[0].given[0].toUpperCase()+'!')
    expect(toJson(wrapper.render())).toMatchSnapshot()
})