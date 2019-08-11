import React from 'react'
import Image from './index'

test('renders correctly', () => {
    const wrapper = render (
        <Image />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('clicks on image | image zoom', (done) => {
    const wrapper = mount (
        <Image />
    )
    wrapper.find('img').first().simulate('click')
    setTimeout(() => {
        expect(toJson(wrapper.render())).toMatchSnapshot()
        done()
    }, 0)
})

test('clicks on magnify | image zoom', (done) => {
    const wrapper = mount (
        <Image />
    )
    wrapper.find('img[alt="Zoom-In"]').simulate('click')
    setTimeout(() => {
        expect(toJson(wrapper.render())).toMatchSnapshot()
        done()
    }, 0)
})