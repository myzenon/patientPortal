import apiGatewayClient from 'libs/aws-api-gateway'

import { CHANGE_API_GATEWAY } from './action'
import { RESET_AUTH } from 'redux/auth/action'

export default (state = apiGatewayClient.newClient(), action) => {
    switch (action.type) {
        case CHANGE_API_GATEWAY :
            return action.apiGateway
        case RESET_AUTH :
            return apiGatewayClient.newClient()
        default :
            return state
    }
}