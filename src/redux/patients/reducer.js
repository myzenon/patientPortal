import { SET_PATIENTS } from './action'
import { SET_USER } from 'redux/user/action'
import { RESET_AUTH } from 'redux/auth/action'

export default (state = [], action) => {
    switch (action.type) {
        case SET_USER :
            return action.user.patients
        case SET_PATIENTS :
            return action.patients
        case RESET_AUTH :
            return []
        default :
            return state
    }
}