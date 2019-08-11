import * as action from './action'

test('loading true', () => {
    expect(action.loading(true)).toEqual({
        type: action.LOADING_IN_PROGRESS
    })
})

test('loading false', () => {
    expect(action.loading(false)).toEqual({
        type: action.LOADING_SUCCESS
    })
})