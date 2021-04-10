import {
    UPDATE_TEAM_DETAILS,
    ADD_PLAYER,
    DELETE_PLAYER,
    UPDATE_PLAYER_DETAILS,
    POPULATE_TEAM_FORM
} from '../actionTypes/teamFormActionTypes'

const initialState = {
    teamId: 0,
    city: '',
    teamName: '',
    playerDetails: [{
        playerId: 0,
        playerName: '',
        playerNumber: '',
        playerPosition: ''
    }]
}


function teamFormReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_TEAM_DETAILS:
            return {
                ...state,
                [action.payload.teamKey]: action.payload.teamValue
            }
        case ADD_PLAYER:
            return {
                ...state,
                playerDetails: [
                    ...state.playerDetails,
                    {
                        playerId: 0,
                        playerName: '',
                        playerNumber: '',
                        playerPosition: ''
                    }
                ]
            }
        case DELETE_PLAYER:
            return {
                ...state,
                playerDetails: state.playerDetails.filter((playerDetail, playerIndex) => playerIndex !== action.payload)
            }
        case UPDATE_PLAYER_DETAILS:
            return {
                ...state,
                playerDetails: state.playerDetails.map((playerDetail, index) => {
                    if (index !== action.payload.playerIndex) {
                        return playerDetail
                    }

                    return {
                        ...playerDetail,
                        [action.payload.playerKey]: action.payload.playerValue
                    }
                })
            }
        case POPULATE_TEAM_FORM:
            if (action.payload === undefined) {
                return {
                    ...state,
                    city: initialState.city,
                    teamName: initialState.teamName,
                    playerDetails: initialState.playerDetails
                }
            } else {
                return {
                    ...state,
                    teamId: action.payload.teamId,
                    city: action.payload.city,
                    teamName: action.payload.teamName,
                    playerDetails: action.payload.playerDetails
                }
            }
        default:
            return state
    }
}

export default teamFormReducer