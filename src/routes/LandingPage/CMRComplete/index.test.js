import React from 'react'
import { CMRComplete } from './index'

import download from 'downloadjs'
jest.mock('downloadjs')
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test.skip('renders correctly', () => {
    const props = {
        user: {
            ...mockObj.user
        },
        cmr: {
            ...mockObj.cmr,
            reviewCompleted: true
        }
    }
    const wrapper = render (
        <CMRComplete {...props} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test.skip('not reviewCompleted yet', done => {
    const props = {
        user: {
            ...mockObj.user
        },
        cmr: {
            ...mockObj.cmr
        },
        push: (url) => {
            expect(url).toBe('/')
            done()
        }
    }
    render (
        <CMRComplete {...props} />
    )
})

test.skip('call getPDF API', done => {
    const props = {
        user: {
            ...mockObj.user
        },
        cmr: {
            ...mockObj.cmr,
            reviewCompleted: true
        },
        callAPIGateway: (name, get) => {
            expect(name).toBe('reportsGet')
            expect(get).toEqual({
                type: 'MAP',
                patientId: mockObj.cmr.patientId
            })
        },
        page: {
            apiData: {
                body: 'test'
            }
        }
    }
    const wrapper = mount (
        <CMRComplete {...props} />
    )
    wrapper.find('span').first().simulate('click')
    setTimeout(() => {
        expect(download).toBeCalledWith(
            'data:application/pdf;charset=utf-8;base64,' + props.page.apiData.body,
            `${mockObj.user.firstName}_${mockObj.user.lastName}_MAP.pdf`,
            'application/pdf'
        )
        done()
    }, 0)
})
