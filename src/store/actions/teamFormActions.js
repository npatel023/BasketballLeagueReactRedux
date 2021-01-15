import {
    POPULATE_TEAM_FORM,
    ADD_PLAYER,
    DELETE_PLAYER,
    UPDATE_PLAYER_DETAILS,
    UPDATE_TEAM_DETAILS
} from '../actionTypes/teamFormActionTypes'

const addPlayer = () => ({
    type: ADD_PLAYER
})

const deletePlayer = playerIndex => ({
    type: DELETE_PLAYER,
    payload: playerIndex
})

const populateTeamForm = teamData => ({
    type: POPULATE_TEAM_FORM,
    payload: teamData
})

const updatePlayerDetails = playerData => ({
    type: UPDATE_PLAYER_DETAILS,
    payload: playerData
})

const updateTeamDetails = teamData => ({
    type: UPDATE_TEAM_DETAILS,
    payload: teamData
})

export {
    addPlayer,
    deletePlayer,
    populateTeamForm,
    updatePlayerDetails,
    updateTeamDetails
}