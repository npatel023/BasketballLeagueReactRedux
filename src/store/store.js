import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import teamReducer from './reducers/teamReducer'
import teamFormReducer from './reducers/teamFormReducer'

const rootReducer = combineReducers({
    teamData: teamReducer,
    teamForm: teamFormReducer
})

export default createStore(rootReducer, composeWithDevTools())