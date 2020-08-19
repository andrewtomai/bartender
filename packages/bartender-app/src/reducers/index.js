// reducers.js
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import room from './room'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  room,
})

export default createRootReducer