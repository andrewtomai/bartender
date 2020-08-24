import * as R from 'ramda'
import { combineReducers } from 'redux'
import BartenderClient from '../../helpers/client'
import * as Status from '../../helpers/status'


// ACTIONS
const SET_CREATE_ROOM_NAME_ACTION = 'SET_CREATE_ROOM_NAME_ACTION';
const SET_CREATE_ROOM_DATE_RANGE_ACTION = 'SET_CREATE_ROOM_DATE_RANGE_ACTION';
const RESET_CREATE_ROOM_STATE = 'RESET_CREATE_ROOM_STATE';
const CREATE_ROOM_REQUEST = 'CREATE_ROOM_REQUEST'
const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS'
const CREATE_ROOM_FAILURE = 'CREATE_ROOM_FAILURE'

// Action Creators
export const setRoomName = (name) => ({
    type: SET_CREATE_ROOM_NAME_ACTION,
    name,
})

export const setDateRange = (dateRange) => ({
    type: SET_CREATE_ROOM_DATE_RANGE_ACTION,
    dateRange,
})

export const createRoom = () => async (dispatch, getState) => {
    const roomName = selectRoomName(getState())
    const dateRange = selectDateRange(getState())
    dispatch({
        before: [CREATE_ROOM_REQUEST],
        onSuccess: [CREATE_ROOM_SUCCESS, RESET_CREATE_ROOM_STATE],
        onFailure: [CREATE_ROOM_FAILURE],
        callAPI: () => BartenderClient.createRoom(roomName, dateRange)
    })
}

// SELECTORS
export const selectRoomName = R.path(['room', 'create', 'name'])

export const selectDateRange = R.path(['room', 'create', 'dateRange'])

export const selectRoomIsCreating = R.pathEq(['room', 'create', 'status'], Status.LOADING)

export const selectRoomCreateButtonIsDisabled = state => !selectRoomName(state) || !selectDateRange(state)

// REDUCER
const defaultCreateRoomState = {
}

const createRoomReducer = (state = defaultCreateRoomState, action) => {
    const { type } = action
    if (type === SET_CREATE_ROOM_NAME_ACTION || type === SET_CREATE_ROOM_DATE_RANGE_ACTION) {
        return { ...state, ...R.dissoc('type', action) }
    }
    else if (type === CREATE_ROOM_REQUEST) return { ...state, status: Status.LOADING }
    else if (type === CREATE_ROOM_SUCCESS) return { ...state, status: Status.SUCCESSFUL }
    else if (type === CREATE_ROOM_FAILURE) return { ...state, status: Status.FAILED }
    else if (type === RESET_CREATE_ROOM_STATE) return defaultCreateRoomState
    return state;
}

const rootRoomReducer = combineReducers({
    create: createRoomReducer
})

export default rootRoomReducer
