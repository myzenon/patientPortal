import React from 'react'
import { HelpMeFindHPID } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

const propsFromRedux = {
    page: {
        data: {
            isCaregiver: true
        }

    },
}
test('renders correctly', () => {
    const props = { ...propsFromRedux }
    const wrapper = render(
        <HelpMeFindHPID {...props} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})