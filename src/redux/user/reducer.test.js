import reducer from './reducer'
import { SET_USER } from './action'
import { RESET_AUTH } from 'redux/auth/action'

describe('test user reducer', () => {
    it('setUser', () => {
        const stateBefore = {}
        const user = { ...mockObj.user }
        const action = {
            type: SET_USER,
            user
        }
        const stateAfter = action.user
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

    it('setUser', () => {
        const stateBefore = {}
        const user = {
            user: {
                ...mockObj.user
            }
        }
        const action = {
            type: SET_USER,
            user
        }
        const stateAfter = mockObj.user
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

    it('resetAuth', () => {
        const user = { ...mockObj.user }
        const stateBefore = user
        const action = {
            type: RESET_AUTH,
        }
        const stateAfter = {}
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

})