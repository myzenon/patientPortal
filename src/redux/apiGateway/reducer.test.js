import reducer from './reducer'
import apiGatewayClient from 'libs/aws-api-gateway'
import { CHANGE_API_GATEWAY } from './action'
import { RESET_AUTH } from 'redux/auth/action'

describe('test apiGateway reducer', () => {
    it('changeApiGateway', () => {
        const stateBefore = {}
        const auth = { ...mockObj.auth }
        const action = {
            type: CHANGE_API_GATEWAY,
            apiGateway: apiGatewayClient.newClient({
                accessKey: auth.AccessKeyId,
                secretKey: auth.SecretAccessKey,
                sessionToken: auth.sessionToken
            })
        }
        const stateAfter = action.apiGateway
        expect(reducer(stateBefore, action)).toEqual(stateAfter)
    })
})