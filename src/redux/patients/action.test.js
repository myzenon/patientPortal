import * as action from './action'

test('setPatients', () => {
    expect(action.setPatients([...mockObj.patients])).toEqual({
        type: action.SET_PATIENTS,
        patients: [...mockObj.patients]
    })
})