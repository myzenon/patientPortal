import { SET_USER } from './action'
import { RESET_AUTH } from 'redux/auth/action'

export default (state = {}, action) => {
    switch (action.type) {
        case SET_USER :
            if (action.user.user) {
                return action.user.user
            }
            return action.user
        case RESET_AUTH :
            return {}
        default :
            return state
    }
}