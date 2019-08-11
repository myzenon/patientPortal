import React from 'react'
import PolicyPopup from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

jest.mock('assets/policy/nopp.html', () => 'nopp content')
jest.mock('assets/policy/eula.html', () => 'eula content')
jest.mock('assets/policy/terms.html', () => 'terms content')
jest.mock('assets/policy/access.html', () => 'access content')

test('renders nopp correctly', () => {
    const wrapper = render (
        <PolicyPopup />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('renders eula correctly', () => {
    const wrapper = mount (
        <PolicyPopup />
    )
    wrapper.find('.tab').at(0).simulate('click')
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('renders terms correctly', () => {
    const wrapper = mount (
        <PolicyPopup />
    )
    wrapper.find('.tab').at(1).simulate('click')
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('renders access correctly', () => {
    const wrapper = mount (
        <PolicyPopup user="caregiver" />
    )
    wrapper.find('.tab').at(2).simulate('click')
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('clicks done button | function called', done => {
    const wrapper = mount (
        <PolicyPopup onDone={() => {
            done()
        }} />
    )
    wrapper.find('button').simulate('click')
})