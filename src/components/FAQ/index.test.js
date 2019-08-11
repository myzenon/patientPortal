import React from 'react'
import FAQ from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")
test('renders correctly', () => {
    const wrapper = render (
        <FAQ />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

