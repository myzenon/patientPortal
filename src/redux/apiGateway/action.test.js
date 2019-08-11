import * as action from './action'
import { Thunk } from 'redux-testkit'
import moxios from 'moxios'
import apiGatewayClient from 'libs/aws-api-gateway'

describe('', () => {
    beforeEach(function () {
        moxios.install()
    })

    afterEach(function () {
        moxios.uninstall()
    })

    test('changeAPIGateway', async () => {
        const auth = mockObj.auth
        const dispatches = await Thunk(action.changeAPIGateway)
                                .execute({...auth})
        expect(dispatches[0].getType()).toBe(action.CHANGE_API_GATEWAY)
    })

    test('apiCall', () => {
        expect(action.apiCall()).toEqual({
            type: action.API_CALL
        })
    })

    test('apiSuccess', () => {
        expect(action.apiSuccess()).toEqual({
            type: action.API_SUCCESS
        })
    })

    test('apiError', async () => {
        const error = new Error()
        const dispatches = await Thunk(action.apiError)
                                .execute(error)

        expect(dispatches[0].getAction()).toEqual({
            type: action.API_ERROR,
            error: {
                status: null,
                message: null
            }
        })
    })

    test('callSyncAPIGateway', async () => {
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
        const mockData = {
            email: 'test@test.com',
            password: 'myPassword1#'
        }
        const state = {
            apiGateway: apiGatewayClient.newClient()
        }
        const dispatches = await Thunk(action.callSyncAPIGateway)
                                .withState(state)
                                .execute('usersLoginPost', null, {
                                    cred: {
                                        user_name: mockData.email,
                                        password: mockData.password
                                    }
                                })
        expect(dispatches[0].getType()).toBe(action.API_CALL)
        expect(dispatches[1].getAction()).toEqual({
            type: action.API_DATA,
            apiData: {...mockObj.auth}
        })
        expect(dispatches[2].getType()).toBe(action.API_SUCCESS)
    })

    test('apiInited', () => {
        expect(action.apiInited()).toEqual({
            type: action.API_INITED
        })
    })
})
