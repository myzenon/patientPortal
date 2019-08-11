import React from 'react'
import { CaregiverPatientLookupConfirm } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
    const props = {
        page: {
            apiData: {
                firstName: 'firstName',
                lastName: 'lastName'
            }
        }
    }
    const wrapper = render (
        <CaregiverPatientLookupConfirm {...props} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})