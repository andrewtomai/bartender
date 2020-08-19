import { dissoc, path } from 'ramda'

// ACTIONS
const SET_CREATE_ROOM_TITLE_ACTION = 'SET_CREATE_ROOM_TITLE_ACTION';
const SET_CREATE_ROOM_DATE_RANGE_ACTION = 'SET_CREATE_ROOM_DATE_RANGE_ACTION';
const RESET_CREATE_ROOM_STATE = 'RESET_CREATE_ROOM_STATE';
const CREATE_ROOM_REQUEST = 'CREATE_ROOM_REQUEST'
const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS'
const CREATE_ROOM_FAILURE = 'CREATE_ROOM_FAILURE'

export const setRoomTitle = (title) => ({
    type: SET_CREATE_ROOM_TITLE_ACTION,
    title,
})

export const setDateRange = (dateRange) => ({
    type: SET_CREATE_ROOM_DATE_RANGE_ACTION,
    dateRange,
})

export const createRoom = () => async (dispatch, getState) => {
    dispatch({
        before: [CREATE_ROOM_REQUEST],
        onSuccess: [CREATE_ROOM_SUCCESS, RESET_CREATE_ROOM_STATE],
        onFailure: [CREATE_ROOM_FAILURE],
        callAPI: () => new Promise((r, rej) => setTimeout(r, 1500))
    })
}

// SELECTORS
export const selectRoomTitle = path(['room', 'create', 'title'])

export const selectDateRange = path(['room', 'create', 'dateRange'])

// REDUCER
const defaultState = {
}

const reducer = (state = defaultState, action) => {
    const { type } = action
    if (type === SET_CREATE_ROOM_TITLE_ACTION || type === SET_CREATE_ROOM_DATE_RANGE_ACTION) {
        return { ...state, ...dissoc('type', action) }
    }
    else if (type === CREATE_ROOM_REQUEST) return { ...state, status: 'LOADING' }
    else if (type === CREATE_ROOM_SUCCESS) return { ...state, status: 'SUCCESS' }
    else if (type === CREATE_ROOM_FAILURE) return { ...state, status: 'FAILURE' }
    else if (type === RESET_CREATE_ROOM_STATE) return defaultState
    return state;
}

export default reducer
