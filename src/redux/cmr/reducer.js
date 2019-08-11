import { SET_CMR } from './action'
import { SET_USER } from 'redux/user/action'
import { RESET_AUTH } from 'redux/auth/action'

export default (state = {}, action) => {
    switch (action.type) {
        case SET_USER :
            return action.user.cmr
        case SET_CMR :
            return action.cmr
        case RESET_AUTH :
            return {}
        default :
            return state
    }
}