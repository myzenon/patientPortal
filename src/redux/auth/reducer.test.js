import reducer from './reducer'
import apiGatewayClient from 'libs/aws-api-gateway'
import { SAVE_AUTH } from './action'
import { RESET_AUTH } from './action'

describe('test auth reducer', () => {
    it('saveAuth', () => {
        const stateBefore = {}
        const auth = { ...mockObj.auth }
        const action = {
            type: SAVE_AUTH,
            auth
        }
        const stateAfter = action.auth
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

    it('resetAuth', () => {
        const stateBefore = { ...mockObj.auth }
        const action = { type: RESET_AUTH }
        const stateAfter = {}
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })

})