import { SAVE_AUTH, RESET_AUTH } from './action'

export default (state = {}, action) => {
    switch (action.type) {
        case SAVE_AUTH :
            return action.auth
        case RESET_AUTH :
            return {}
        default :
            return state
    }
}