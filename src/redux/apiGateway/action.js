import apiGatewayClient from 'libs/aws-api-gateway'

export const CHANGE_API_GATEWAY = 'CHANGE_API_GATEWAY'
export const changeAPIGateway = (authObj) => function changeAPIGateway (dispatch, getState) {
    const auth = authObj || getState().auth
    dispatch ({
        type: CHANGE_API_GATEWAY,
        apiGateway: apiGatewayClient.newClient ({
            accessKey: auth.AccessKeyId,
            secretKey: auth.SecretAccessKey,
            sessionToken: auth.sessionToken,
            region: process.env.REGION
        })
    })
}

import { push } from 'react-router-redux'
import { resetAuth } from 'redux/auth/action'

export const API_CALL = 'API_CALL'
export const API_SUCCESS = 'API_SUCCESS'
export const API_ERROR = 'API_ERROR'
export const API_DATA = 'API_DATA'
export const apiCall = () => ({
    type: API_CALL
})
export const apiSuccess = () => ({
    type: API_SUCCESS
})
export const apiError = (error) => async (dispatch) => {
    const stateError = {
        status: null,
        message: null
    }
    if (error.response) {
        if (error.response.status) {
            stateError.status = error.response.status
        }
        if (error.response.data && error.response.data.message) {
            stateError.message = error.response.data.message
        }
    }
    // console.error(error)
    if (stateError.status === 400 && (stateError.message === 'Token is invalid' || stateError.message.includes('The security token included in the request is expired'))) {
        await dispatch(resetAuth())
        await dispatch(push('/login'))
    }
    await dispatch({
        type: API_ERROR,
        error: stateError
    })
}
export const callAPIGateway = (name, get, post, option) => async (dispatch, getState) => {
    const apiGateway = getState().apiGateway
    try {
        dispatch(apiCall())
        dispatch({
            type: API_DATA,
            apiData: (apiGateway[name](get, post, option)).data
        })
        dispatch(apiSuccess())
    }
    catch(error) {
        await dispatch(await apiError(error))
    }
}
export const callSyncAPIGateway = (name, get, post, option) => async (dispatch, getState) => {
    const apiGateway = getState().apiGateway
    try {
        dispatch(apiCall())
        await dispatch({
            type: API_DATA,
            apiData: (await apiGateway[name](get, post, option)).data
        })
        dispatch(apiSuccess())
    }
    catch(error) {
        await dispatch(await apiError(error))
    }
}


export const API_INITED = 'API_INITED'
export const apiInited = () => ({ type: API_INITED })
