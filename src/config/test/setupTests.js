import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import 'jest-localstorage-mock'
import 'babel-polyfill'
import createRouterContext from 'react-router-test-context'
import PropTypes from 'prop-types'
import mockObj from './mockTestObj'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })

// Make Enzyme functions available in all test files without importing
// global.shallow = shallow
// global.render = render
// global.mount = mount
global.toJson = toJson
global.mockObj = mockObj

// Fail tests on any warning
// console.error = message => {
//     throw new Error(message)
// }

const routerContext = createRouterContext()
const wrapWithRouterContext = (fn, component, contextParam = routerContext) => {
    const childContextTypes = {
        router: PropTypes.object,
        store: PropTypes.object
    }
    let context = contextParam 
    if (contextParam !== routerContext) {
        context = {
            ...routerContext,
            ...contextParam
        }
    }
    return fn(component, { context, childContextTypes })
}

global.mount = (component, context) => wrapWithRouterContext(mount, component, context)
global.render = (component, context) => wrapWithRouterContext(render, component, context)
global.shallow = (component, context) => wrapWithRouterContext(shallow, component, context)