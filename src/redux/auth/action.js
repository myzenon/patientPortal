import { changeAPIGateway } from 'redux/apiGateway/action'
import { countAmountMedsCompleted, isReviewedMedsComplete } from 'libs/utils'
import moment from 'moment'
import { apiCall, apiSuccess, apiError, apiInited } from 'redux/apiGateway/action'
import { setPatient } from 'redux/patient/action'
import { setCMR } from 'redux/cmr/action'
import { setUser } from 'redux/user/action'

import { push } from 'react-router-redux'
export const SAVE_AUTH = 'SAVE_AUTH'
export const RESET_AUTH = 'RESET_AUTH'

export const resetAuth = () => ({ type: RESET_AUTH })

export const saveAuth = (auth) => async function saveAuth (dispatch, getState) {
    try {
        dispatch ({
            type: SAVE_AUTH,
            auth
        })
        dispatch(changeAPIGateway(auth))
        let apiGateway = getState().apiGateway
        //const patientId = getState().auth.patientId
        //console.log('in saveAuth: patientId = ' + patientId)
        dispatch(apiCall())
        // console.log('in saveAuth:calling usersGetUserGet')
        const user = (await apiGateway.usersGetUserGet()).data
        if (!user.patient) {
            user.patient = null
        } else {
            const date = moment().utc().format('YYYY-MM-DDTHH:mm:ss')
            await apiGateway.fhirPatientsIdPut({ id: user.patient.id }, { lastReviewDate: date })
        }
        if (!user.cmr) {
            user.cmr = null
        }
        if (!user.patients) {
            user.patients = null
        }
        await dispatch(setUser(user))
        // Get patient id from user json
        // console.log('in saveAuth:usersGetUserGet returned = ' + JSON.stringify(user))
        //const patientId = user.patientId

        // User json contains patient json if logged in as a patient
        //const patient = (await apiGateway.fhirPatientsIdGet({ id: patientId })).data
        // const patient = user.patient
        // console.log('in saveAuth:fhirPatientsIdGet returned = ' + JSON.stringify(patient))
        // await dispatch(setPatient(patient))

        // // User also contains cmr
        // //const cmr = (await apiGateway.fhirCmrGet({ patientId })).data[0]
        // const cmr = user.cmr
        // console.log('in saveAuth:fhirCmrGet returned = ' + JSON.stringify(cmr))
        // await dispatch(setCMR(cmr))
        //console.log("dispatch")
        if (!user.patient) {
            dispatch(push('/caregiver-patient-lookup'))
        }
        await dispatch(apiInited())

        dispatch(apiSuccess())
    }
    catch (error) {
        dispatch(apiError(error))
    }
}

export const login = (email, password) => async function login (dispatch, getState) {
    let apiGateway = getState().apiGateway
    const user  = {
        user_name: email,
        password: password
    }
    try {
        dispatch(apiCall())
        const auth = (await apiGateway.usersLoginPost(null, { cred: user })).data
        await dispatch(saveAuth(auth))

        dispatch(apiSuccess())
        dispatch(goToPageAfterAuth())
    }
    catch (error) {
        dispatch(apiError(error))
    }
}

export const authInited = () => async function authInited (dispatch, getState) {
    const auth = getState().auth
    if (JSON.stringify(auth) !== '{}') {
        await dispatch(await saveAuth(auth))
        const currentPath = getState().router.location.pathname
        if (currentPath === '/') {
            await dispatch(goToPageAfterAuth())
        }
    }
}

export const updatePassword = (creds) => async (dispatch, getState) => {
    let apiGateway = getState().apiGateway
    try {
        dispatch(apiCall())
        const auth = (await apiGateway.usersUpdatePasswordPost(null, creds)).data
        await dispatch(saveAuth(auth))
        dispatch(apiSuccess())
        dispatch(goToPageAfterAuth())
    }
    catch (error) {
        dispatch(apiError(error))
    }
}

export const goToPageAfterAuth = () => function goToPageAfterAuth (dispatch, getState) {

    // get data from redux state
    const state = getState()
    const { patient, cmr, user, patients } = state
    // define location
    let location = ''
    //console.log("location"+location)
    // if user is a caregiver go to new registration so they can select patient by entering hpid
    if (!patient) {
        location = '/caregiver-patient-lookup'
    }
    else {
            // Display NOPP/Terms/end user if current policies have not been accepted
            if (cmr.complete) {
                // Arine has finished the CMR and it is ready to display to the patient
                location = '/cmr-complete'
            } else if (!user.noppStatus) {
                location = '/update-policies'
            } else if (!patient.confirmedInfo) {
                // User has not confirmed info
                location = '/confirm-info'
            } else if (!patient.confirmedPcp) {
                    location = '/pcp-query'
            } else if (patient.appointment && !cmr.conversationDate) {
                location = '/appointment-scheduled'
            } else {
                location = '/landing-page'
            }
    }
    dispatch(push(location))
}
