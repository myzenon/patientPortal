import * as action from './action'

test('setCMR', () => {
    expect(action.setCMR({...mockObj.cmr})).toEqual({
        type: action.SET_CMR,
        cmr: {...mockObj.cmr}
    })
})