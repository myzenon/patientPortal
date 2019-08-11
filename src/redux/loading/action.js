export const LOADING_IN_PROGRESS = 'LOADING_IN_PROGRESS'
export const LOADING_SUCCESS = 'LOADING_SUCCESS'

export const loading = (state) => ({
    type: !state ? LOADING_SUCCESS : LOADING_IN_PROGRESS
})