import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { App } from './App'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")
jest.mock('assets/policy/nopp.html', () => '<meta charset="UTF-8">\n<meta version="v1.0">\nnopp content')
jest.mock('assets/policy/eula.html', () => '<meta charset="UTF-8">\n<meta version="v1.0">\neula content')
jest.mock('assets/policy/terms.html', () => '<meta charset="UTF-8">\n<meta version="v1.0">\nterms content')
jest.mock('assets/policy/access.html', () => '<meta charset="UTF-8">\n<meta version="v1.0">\naccess content')

test('renders without initial system ', () => {
    const props = {
        authInited: () => {},
        history: createHistory(),
        page: {
            apiInited: false,
            auth: {}
        }
    }
    const wrapper = render (
        <App {...props} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})