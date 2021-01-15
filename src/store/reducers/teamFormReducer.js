import {
    POPULATE_TEAM_FORM,
    ADD_PLAYER,
    DELETE_PLAYER,
    UPDATE_PLAYER_DETAILS,
    UPDATE_TEAM_DETAILS
} from '../actionTypes/teamFormActionTypes'

const initialState = {
    teamFormData: {
        id: 0, 
        city: '',
        teamName: '',
        playerDetails: [{ 
            playerName: '',
            playerPosition: '',
            playerNumber: ''
        }]
    }
}

function teamFormReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PLAYER:
            return {
                ...state,
                teamFormData: {
                    ...state.teamFormData,
                    playerDetails: [
                        ...state.teamFormData.playerDetails,
                        {
                            playerName: '',
                            playerNumber: '',
                            playerPosition: ''
                        }
                    ]
                }
            }
        case DELETE_PLAYER:
            return {
                ...state,
                teamFormData: {
                    ...state.teamFormData,
                    playerDetails: state.teamFormData.playerDetails.filter((playerDetail, playerIndex) => playerIndex !== action.payload)
                }
            }
        case POPULATE_TEAM_FORM:
            if (action.payload === undefined) {
                return {
                    ...state,
                    teamFormData: initialState.teamFormData
                }
            } else {
                return {
                    ...state,
                    teamFormData: action.payload
                }
            }
        case UPDATE_TEAM_DETAILS:
            return {
                ...state,
                teamFormData: {
                    ...state.teamFormData,
                    [action.payload.teamKey]: action.payload.teamValue
                }
            }
        case UPDATE_PLAYER_DETAILS:
            return {
                ...state,
                teamFormData: {
                    ...state.teamFormData,
                    playerDetails: state.teamFormData.playerDetails.map((playerDetail, index) => {
                        if (index !== action.payload.playerIndex) {
                            return playerDetail
                        }

                        return {
                            ...playerDetail,
                            [action.payload.playerKey]: action.payload.playerValue
                        }
                    })
                }
            }
        default:
            return state
    }
}

export default teamFormReducer