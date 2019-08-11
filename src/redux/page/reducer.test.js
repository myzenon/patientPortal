import reducer from './reducer'
import { initError, initState } from './reducer'
import { API_CALL, API_ERROR, API_DATA, API_INITED } from 'redux/apiGateway/action'
import { PAGE_SAVE_DATA } from './action'
import { LOCATION_CHANGE } from 'react-router-redux'
import { RESET_AUTH } from 'redux/auth/action'


describe('test page reducer', () => {
    const initError = {
        status: null,
        message: null
    }

    const initState = {
        error: { ...initError },
        apiInited: false,
        apiData: null,
        data: {},
        back: null
    }

    it('apiCall', () => {
        const stateBefore = { ...initState }
        const action = {
            type: API_CALL,
        }
        const stateAfter = { ...stateBefore, error: { ...initError } }
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

    it('locationChange', () => {
        const stateBefore = { ...initState }
        const action = {
            type: LOCATION_CHANGE,
        }
        const stateAfter = { ...stateBefore, error: { ...initError } }
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

    it('apiError', () => {
        const stateBefore = { ...initState }
        const error = {
            status: 200,
            message: "OK"
        }
        const action = {
            type: API_ERROR,
            error
        }
        const stateAfter = { ...stateBefore, error: action.error }
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

    it('apiData', () => {
        const stateBefore = { ...initState }
        const apiData = {
            data: {}
        }
        const action = {
            type: API_DATA,
            apiData
        }
        const stateAfter = { ...stateBefore, apiData: action.apiData }
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

    it('pageSaveData', () => {
        const stateBefore = { ...initState }
        const data = { actionData: {} }
        const action = {
            type: PAGE_SAVE_DATA,
            data
        }
        const stateAfter = { ...stateBefore, data: { ...stateBefore.data, ...action.data } }
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

    it('apiInited', () => {
        const stateBefore = { ...initState }
        const data = { actionData: {} }
        const action = {
            type: API_INITED,
        }
        const stateAfter = { ...stateBefore, apiInited: true }
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

    it('resetAuth', () => {
        const stateBefore = { ...initState }
        const data = { actionData: {} }
        const action = {
            type: RESET_AUTH,
        }
        const stateAfter = { ...stateBefore, apiInited: false, apiData: null }
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })
})