import React from 'react'
import { AppointmentScheduled } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
    const props = {
        location:{"search":"none"},
        user: {
            ...mockObj.user
        },
        cmr: {
            ...mockObj.cmr
        },
        patient: {
            ...mockObj.patient,
            appointment: '2018-03-03T11:00:00-0800'
        },
        jestTest: true
    }
    const wrapper = render (
        <AppointmentScheduled {...props} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})


test('no appointment and cmr.complete = true', done => {
    const props = {
        location:{"search":"none"},
        user: {
            ...mockObj.user
        },
        cmr: {
            ...mockObj.cmr,
            complete: true
        },
        patient: {
            ...mockObj.patient,
            appointment: ''
        },
        push: (url) => {
            expect(url).toBe('/')
            done()
        }
    }
    render (
        <AppointmentScheduled {...props} />
    )
})
