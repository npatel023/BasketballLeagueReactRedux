import {
    ADD_TEAM,
    UPDATE_SELECTED_TEAM,
    UPDATE_TEAM
} from '../actionTypes/teamActionTypes'

const initialState = {
    selectedTeam: '',
    teams: []
}

function teamReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_TEAM:
            return {
                ...state,
                teams: [
                    ...state.teams,
                    action.payload
                ]
            }
        case UPDATE_SELECTED_TEAM:
            return {
                ...state,
                selectedTeam: action.payload
            }
        case UPDATE_TEAM:
            return {
                ...state,
                teams: state.teams.map((team) => {
                    if (`${team.city}-${team.teamName}` === action.payload.id) {
                        return action.payload.teamData
                    }

                    return team
                })
            }
        default:
            return state
    }
}

export default teamReducer