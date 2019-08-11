import * as action from './action'

test('savePageData', () => {
    const data = {
        testData: '123456'
    }
    expect(action.savePageData({...data})).toEqual({
        type: action.PAGE_SAVE_DATA,
        data: {...data}
    })
})