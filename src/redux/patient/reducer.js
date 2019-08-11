import { SET_PATIENT } from './action'
import { SET_USER } from 'redux/user/action'
import { RESET_AUTH } from 'redux/auth/action'

export default (state = {}, action) => {
    switch (action.type) {
        case SET_USER :
            return action.user.patient
        case SET_PATIENT :
            return action.patient
        case RESET_AUTH :
            return {}
        default :
            return state
    }
}