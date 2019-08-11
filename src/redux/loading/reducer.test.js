import reducer from './reducer'
import { LOADING_IN_PROGRESS, LOADING_SUCCESS } from './action'
import { API_CALL, API_SUCCESS, API_ERROR } from 'redux/apiGateway/action'

describe('test loading reducer', () => {
    it('LoadingInProgress', () => {
        const stateBefore = false
        const action = {
            type: LOADING_IN_PROGRESS,
        }
        const stateAfter = true
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

    it('LoadingSuccess', () => {
        const stateBefore = true
        const action = {
            type: LOADING_SUCCESS,
        }
        const stateAfter = false
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

    it('ApiCall', () => {
        const stateBefore = false
        const action = {
            type: API_CALL,
        }
        const stateAfter = true
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

    it('ApiError', () => {
        const stateBefore = true
        const action = {
            type: API_ERROR,
        }
        const stateAfter = false
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })
})