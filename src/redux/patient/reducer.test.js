import reducer from './reducer'
import { SET_PATIENT } from './action'
import { RESET_AUTH } from 'redux/auth/action'

describe('test patient reducer', () => {
    it('setPatient', () => {
        const stateBefore = {}
        const patient = { ...mockObj.patient }
        const action = {
            type: SET_PATIENT,
            patient
        }
        const stateAfter = action.patient
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

    it('resetAuth', () => {
        const patient = { ...mockObj.patient }
        const stateBefore = patient
        const action = {
            type: RESET_AUTH,
        }
        const stateAfter = {}
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

})