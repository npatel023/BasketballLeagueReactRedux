import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import teamFormReducer from './reducers/teamFormReducer'
import teamReducer from './reducers/teamReducer'

const rootReducer = combineReducers({
    teamForm: teamFormReducer,
    teams: teamReducer
})

export default createStore(rootReducer, composeWithDevTools());