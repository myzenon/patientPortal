import * as action from './action'

test('setUser', () => {
    expect(action.setUser({...mockObj.user})).toEqual({
        type: action.SET_USER,
        user: {...mockObj.user}
    })
})