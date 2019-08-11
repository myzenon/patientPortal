import * as action from './action'
import * as apiAction from 'redux/apiGateway/action'
import { SET_USER } from 'redux/user/action'
import { Thunk } from 'redux-testkit'
import moxios from 'moxios'
import apiGatewayClient from 'libs/aws-api-gateway'
import moment from 'moment'

describe('', () => {
    beforeEach(function () {
        moxios.install()
    })

    afterEach(function () {
        moxios.uninstall()
    })

    test('resetAuth', () => {
        expect(action.resetAuth()).toEqual({
            type: action.RESET_AUTH
        })
    })

    test('saveAuth', async () => {
        const date = moment().utc().format('YYYY-MM-DDTHH:mm:ss')
        moxios.stubRequest(/users.*/, {
            status: 200,
            response: { patient: mockObj.patient, cmr: mockObj.cmr }
        })

        moxios.wait(function () {
            const request = moxios.requests.mostRecent()
            const getData = JSON.parse(request.config.data)
            expect(getData.lastReviewDate).toBe(date)
            request.respondWith({
                status: 200
            })
        })

        const state = {
            auth: { ...mockObj.auth },
            patient: mockObj.patient,
            cmr: mockObj.cmr,
            apiGateway: apiGatewayClient.newClient()
        }
        const dispatches = await Thunk(action.saveAuth)
            .withState(state)
            .execute({ ...mockObj.auth })

        expect(dispatches[0].getAction()).toEqual({
            type: action.SAVE_AUTH,
            auth: { ...mockObj.auth }
        })

        expect(dispatches[1].isFunction()).toBe(true)
        expect(dispatches[1].getName()).toBe('changeAPIGateway')

        expect(dispatches[2].getType()).toBe(apiAction.API_CALL)

        expect(dispatches[3].getType()).toBe(SET_USER)
        // expect(dispatches[3].getType()).toBe(SET_PATIENT)
        // expect(dispatches[4].getType()).toBe(SET_CMR)
        expect(dispatches[4].getType()).toBe(apiAction.API_INITED)
        expect(dispatches[5].getType()).toBe(apiAction.API_SUCCESS)
    }, 10000)

    test('login', async () => {
        const mockData = {
            email: 'test@test.com',
            password: 'myPassword1#'
        }

        // Mock axios request
        moxios.wait(function () {
            const request = moxios.requests.mostRecent()
            const getData = JSON.parse(request.config.data)
            expect(getData.cred.user_name).toBe(mockData.email)
            expect(getData.cred.password).toBe(mockData.password)
            request.respondWith({
                status: 200,
                response: mockObj.auth
            })
        })

        // Test Login Action
        const state = {
            apiGateway: apiGatewayClient.newClient()
        }
        const dispatches = await Thunk(action.login)
            .withState(state)
            .execute(mockData.email, mockData.password)

        expect(dispatches[0].getType()).toBe(apiAction.API_CALL)

        expect(dispatches[1].isFunction()).toBe(true)
        expect(dispatches[1].getName()).toBe('saveAuth')

        expect(dispatches[2].getType()).toBe(apiAction.API_SUCCESS)

        expect(dispatches[3].isFunction()).toBe(true)
        expect(dispatches[3].getName()).toBe('goToPageAfterAuth')
    })

    test('authInited', async () => {
        const state = {
            auth: mockObj.auth,
            router: {
                location: {
                    pathname: '/'
                }
            }
        }
        const dispatches = await Thunk(action.authInited)
            .withState(state)
            .execute()

        expect(dispatches[0].isFunction()).toBe(true)
        expect(dispatches[0].getName()).toBe('saveAuth')

        expect(dispatches[1].isFunction()).toBe(true)
        expect(dispatches[1].getName()).toBe('goToPageAfterAuth')
    })

    test('updatePassword', async () => {
        const creds = {
            token: 'eyJlbWFpbCI6ICJzaS56ZW5vbkBnbWFpbC5jb20iLCAicGF0aWVudF9pZCI6ICI3YzczMzBjMC1hMzIxLTRjYmEtODE1My1jMTVlOWU4N2ZiZGYiLCAib3JnX2lkIjogImY5MWIxOWQyLTU1ZTUtNDcyZC04ZTllLWFmMmIzZjcyOTIxZCJ9',
            code: '480348',
            password: 'myPassword1#'
        }

        // Mock axios request
        moxios.wait(function () {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: mockObj.auth
            })
        })

        // Test Login Action
        const state = {
            apiGateway: apiGatewayClient.newClient()
        }
        const dispatches = await Thunk(action.login)
            .withState(state)
            .execute({ creds })

        expect(dispatches[0].getType()).toBe(apiAction.API_CALL)

        expect(dispatches[1].isFunction()).toBe(true)
        expect(dispatches[1].getName()).toBe('saveAuth')

        expect(dispatches[2].getType()).toBe(apiAction.API_SUCCESS)

        expect(dispatches[3].isFunction()).toBe(true)
        expect(dispatches[3].getName()).toBe('goToPageAfterAuth')
    })

    test('goToPageAfterAuth 1 | pcp-query', async () => {
        const state = {
            patient: { ...mockObj.patient },
            cmr: { ...mockObj.cmr },
            user: { ...mockObj.user }
        }
        const dispatches = await Thunk(action.goToPageAfterAuth)
            .withState(state)
            .execute()

        expect(dispatches[0].getAction()).toEqual({
            type: '@@router/CALL_HISTORY_METHOD',
            payload: {
                method: 'push',
                args: [
                    '/pcp-query'
                ]
            }
        })
    })

    test('goToPageAfterAuth 2 | caregiver-patient-lookup', async () => {
        const state = {
            patient: { ...mockObj.patient },
            cmr: { ...mockObj.cmr },
            user: { ...mockObj.user },
            patients: []
        }
        state.user.patients = []
        const dispatches = await Thunk(action.goToPageAfterAuth)
            .withState(state)
            .execute()

        expect(dispatches[0].getAction()).toEqual({
            type: '@@router/CALL_HISTORY_METHOD',
            payload: {
                method: 'push',
                args: [
                    '/pcp-query'
                ]
            }
        })
    })

    test('goToPageAfterAuth 3 | update-policies', async () => {
        const state = {
            patient: { ...mockObj.patient },
            cmr: { ...mockObj.cmr },
            user: { ...mockObj.user }
        }
        state.user.noppStatus = false
        const dispatches = await Thunk(action.goToPageAfterAuth)
            .withState(state)
            .execute()

        expect(dispatches[0].getAction()).toEqual({
            type: '@@router/CALL_HISTORY_METHOD',
            payload: {
                method: 'push',
                args: [
                    '/update-policies'
                ]
            }
        })
    })

    test('goToPageAfterAuth 4 | confirm-info', async () => {
        const state = {
            patient: { ...mockObj.patient },
            cmr: { ...mockObj.cmr },
            user: { ...mockObj.user }
        }
        state.user.noppStatus = true
        state.patient.confirmedInfo = false
        const dispatches = await Thunk(action.goToPageAfterAuth)
            .withState(state)
            .execute()

        expect(dispatches[0].getAction()).toEqual({
            type: '@@router/CALL_HISTORY_METHOD',
            payload: {
                method: 'push',
                args: [
                    '/confirm-info'
                ]
            }
        })
    })

    test('goToPageAfterAuth 5 | cmr-complete', async () => {
        const state = {
            patient: { ...mockObj.patient },
            cmr: { ...mockObj.cmr },
            user: { ...mockObj.user }
        }
        state.user.noppStatus = true
        state.patient.confirmedInfo = true
        state.patient.confirmedPcp = true
        state.cmr.complete = true
        const dispatches = await Thunk(action.goToPageAfterAuth)
            .withState(state)
            .execute()

        expect(dispatches[0].getAction()).toEqual({
            type: '@@router/CALL_HISTORY_METHOD',
            payload: {
                method: 'push',
                args: [
                    '/cmr-complete'
                ]
            }
        })
    })

    test('goToPageAfterAuth 6 | appointment-scheduled', async () => {
        const state = {
            patient: { ...mockObj.patient },
            cmr: { ...mockObj.cmr },
            user: { ...mockObj.user }
        }
        state.user.noppStatus = true
        state.patient.confirmedInfo = true
        state.patient.confirmedPcp = true
        state.cmr.complete = false
        state.cmr.smartQuestionsCompleted = true
        state.patient.appointment = true
        const dispatches = await Thunk(action.goToPageAfterAuth)
            .withState(state)
            .execute()

        expect(dispatches[0].getAction()).toEqual({
            type: '@@router/CALL_HISTORY_METHOD',
            payload: {
                method: 'push',
                args: [
                    '/appointment-scheduled'
                ]
            }
        })
    })

    test('goToPageAfterAuth 7 | landing-page', async () => {
        const state = {
            patient: { ...mockObj.patient },
            cmr: { ...mockObj.cmr },
            user: { ...mockObj.user }
        }
        state.user.noppStatus = true
        state.patient.confirmedInfo = true
        state.patient.confirmedPcp = true
        state.cmr.complete = false
        state.cmr.smartQuestionsCompleted = true
        const dispatches = await Thunk(action.goToPageAfterAuth)
            .withState(state)
            .execute()

        expect(dispatches[0].getAction()).toEqual({
            type: '@@router/CALL_HISTORY_METHOD',
            payload: {
                method: 'push',
                args: [
                    '/landing-page'
                ]
            }
        })
    })

    test('goToPageAfterAuth 8 | meds-identified', async () => {
        const state = {
            patient: { ...mockObj.patient },
            cmr: { ...mockObj.cmr },
            user: { ...mockObj.user }
        }
        state.user.noppStatus = true
        state.patient.confirmedInfo = true
        state.patient.confirmedPcp = true
        state.cmr.complete = false
        state.cmr.medications.forEach(medication => {
            state.cmr[`medication_${medication.id}`] = {}
        })
        const dispatches = await Thunk(action.goToPageAfterAuth)
            .withState(state)
            .execute()

        expect(dispatches[0].getAction()).toEqual({
            type: '@@router/CALL_HISTORY_METHOD',
            payload: {
                method: 'push',
                args: [
                    '/landing-page'
                ]
            }
        })
    })

    test('goToPageAfterAuth 9 | meds-other-meds', async () => {
        const state = {
            patient: { ...mockObj.patient },
            cmr: { ...mockObj.cmr },
            user: { ...mockObj.user }
        }
        state.user.noppStatus = true
        state.patient.confirmedInfo = true
        state.patient.confirmedPcp = true
        state.cmr.medications.forEach((medication) => {
                state.cmr[`medication_${medication.id}`] = {
                    reviewCompleted: true
                }
        })
        const dispatches = await Thunk(action.goToPageAfterAuth)
            .withState(state)
            .execute()

        expect(dispatches[0].getAction()).toEqual({
            type: '@@router/CALL_HISTORY_METHOD',
            payload: {
                method: 'push',
                args: [
                    '/landing-page'
                ]
            }
        })
    })

    test('goToPageAfterAuth 10 | landing-page', async () => {
        const state = {
            patient: { ...mockObj.patient },
            cmr: { ...mockObj.cmr },
            user: { ...mockObj.user }
        }
        state.user.noppStatus = true
        state.patient.confirmedInfo = true
        state.patient.confirmedPcp = true
        state.cmr.complete = false
        state.cmr.medications.forEach((medication,index) => {
            if(index + 1 < state.cmr.medications.length ){
                state.cmr[`medication_${medication.id}`] = {
                    reviewCompleted: true
                }
            }
        })
        const dispatches = await Thunk(action.goToPageAfterAuth)
            .withState(state)
            .execute()

        expect(dispatches[0].getAction()).toEqual({
            type: '@@router/CALL_HISTORY_METHOD',
            payload: {
                method: 'push',
                args: [
                    '/landing-page'
                ]
            }
        })
    })
})
