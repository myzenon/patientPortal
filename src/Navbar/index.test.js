import React from 'react'
import { Navbar } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")
test('renders correctly', () => {
    const props = {
        router: {
            location: {
                pathname: '/'
            }
        }
    }
    expect(toJson(render(<Navbar {...props} />))).toMatchSnapshot()
})

test('clicking the my progewss | displays the dropdown progess', done => {
    const props = {
        user: { ...mockObj.user },
        auth: { ...mockObj.auth },
        cmr: { ...mockObj.cmr },
        router: {
            location: {
                pathname: '/meds-identified'
            }
        },
        patient: { ...mockObj.patient },
        patients: [{self: true}]
    }
    props.cmr[`medication_${mockObj.cmr.medications[0].id}`] = { reviewCompleted: true }
    props.cmr[`medication_${mockObj.cmr.medications[1].id}`] = { reviewCompleted: true }
    const wrapper = mount(
        <Navbar { ...props } />
    )
    setTimeout(() => {
        wrapper.update()
        wrapper.find('.myProgress').simulate('click')
        expect(toJson(wrapper.render())).toMatchSnapshot()
        done()
    }, 0)
})

test('show helpme final', done => {
    const props = {
        router: {
            location: {
                pathname: '/'
            }
        }
    }
    const wrapper = mount(
        <Navbar { ...props } />
    )
    setTimeout(() => {
        wrapper.update()
        wrapper.find('.helpMenu').simulate('click')
        wrapper.update()
        wrapper.find('.userMenuExpandWrapper li').first().simulate('click')
        setTimeout(() => {
            expect(toJson(wrapper.render())).toMatchSnapshot()
            done()
        }, 0)
    }, 0)
})

test.skip('clicking the menu down caret | displays the dropdown menu', done => {
    const props = {
        user: { ...mockObj.user },
        auth: { ...mockObj.auth },
        router: {
            location: {
                pathname: '/meds-identified'
            }
        },
        patient: { ...mockObj.patient },
        patients: [{self: true}]
    }
    const wrapper = mount(
        <Navbar { ...props } />
    )
    setTimeout(() => {
        wrapper.update()
        wrapper.find('.userMenu').simulate('click')
        expect(toJson(wrapper.render())).toMatchSnapshot()
        done()
    }, 0)
})

test.skip('Clicking Sign Out. logs out the user and goes to the home page', done => {
    const props = {
        cmr: { ...mockObj.cmr },
        user: { ...mockObj.user },
        auth: { ...mockObj.auth },
        router: {
            location: {
                pathname: '/signOut'
            }
        },
        patient: { ...mockObj.patient },
        patients: [{self: true}],
        resetAuth: () => {
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/login')
            done()
        }
    }
    
    props.cmr = { complete: false }
    const wrapper = mount(
        <Navbar { ...props } />
    )
    setTimeout(() => {
        wrapper.update()
        wrapper.find('.userMenu').simulate('click')
        wrapper.find('li').at(3).simulate('click')
    }, 0)
})
