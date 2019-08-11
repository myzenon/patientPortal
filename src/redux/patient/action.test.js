import * as action from './action'

test('setPatient', () => {
    expect(action.setPatient({...mockObj.patient})).toEqual({
        type: action.SET_PATIENT,
        patient: {...mockObj.patient}
    })
})