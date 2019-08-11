import reducer from './reducer'
import { SET_CMR } from './action'
import { RESET_AUTH } from 'redux/auth/action'

describe('test cmr reducer', () => {
    it('setCMR', () => {
        const stateBefore = {}
        const cmr = { ...mockObj.cmr }
        const action = {
            type: SET_CMR,
            cmr
        }
        const stateAfter = action.cmr
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

    it('resetAuth', () => {
        const cmr = { ...mockObj.cmr }
        const stateBefore = cmr
        const action = {
            type: RESET_AUTH,
        }
        const stateAfter = {}
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

})