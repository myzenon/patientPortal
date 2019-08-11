import { LOADING_IN_PROGRESS, LOADING_SUCCESS } from './action'
import { API_CALL, API_SUCCESS, API_ERROR } from 'redux/apiGateway/action'

export default (state = false, action) => {
    switch (action.type) {
        case API_CALL :
        case LOADING_IN_PROGRESS :
            return true
        case API_SUCCESS :
        case API_ERROR :
        case LOADING_SUCCESS :
            return false
        default :
            return state
    }
}