import { API_CALL, API_ERROR, API_DATA, API_INITED } from 'redux/apiGateway/action'
import { PAGE_SAVE_DATA } from './action'
import { LOCATION_CHANGE } from 'react-router-redux'
import { RESET_AUTH } from 'redux/auth/action'

const initError = {
    status: null,
    message: null
}

const initState = {
    error: {...initError},
    apiInited: false,
    apiData: null,
    data: {},
    back: null
}

export default (state = initState, action) => {
    switch (action.type) {
        case LOCATION_CHANGE :
        case API_CALL :
            return {
                ...state,
                error: {...initError}
            }
        case API_ERROR :
            return {
                ...state,
                error: action.error
            }
        case API_DATA :
            return {
                ...state,
                apiData: action.apiData
            }
        case PAGE_SAVE_DATA :
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.data
                }
            }
        case API_INITED : 
            return {
                ...state,
                apiInited: true
            }
        case RESET_AUTH :
            return {
                ...state,
                apiInited: false,
                apiData: null
            }
        default :
            return state
    }
}