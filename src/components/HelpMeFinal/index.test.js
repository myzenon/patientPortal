import React from 'react'
import HelpMeFinal from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")
test('renders correctly', () => {
    const wrapper = render (
        <HelpMeFinal />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('clicks done is call props ondone fn', done => {
    const onDone = () => {
        done()
    }
    const wrapper = mount (
        <HelpMeFinal onDone={onDone} />
    )
    wrapper.find('button').simulate('click')
})