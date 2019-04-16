import { combineReducers } from 'redux'
import audioReducer        from 'core/reducers/reducer-audio'
import uiReducer           from 'core/reducers/reducer-ui'

const rootReducer = combineReducers({
  audio: audioReducer,
  ui: uiReducer
})

export default rootReducer
