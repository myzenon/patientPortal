import reducer from './reducer'
import { SET_PATIENTS } from './action'
import { RESET_AUTH } from 'redux/auth/action'

describe('test patients reducer', () => {
    it('setpatients', () => {
        const stateBefore = {}
        const patients = [ ...mockObj.patients ]
        const action = {
            type: SET_PATIENTS,
            patients
        }
        const stateAfter = action.patients
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

    it('resetAuth', () => {
        const patients = [ ...mockObj.patients ]
        const stateBefore = patients
        const action = {
            type: RESET_AUTH,
        }
        const stateAfter = []
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

})