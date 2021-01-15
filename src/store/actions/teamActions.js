import {
    UPDATE_SELECTED_TEAM,
    ADD_TEAM,
    UPDATE_TEAM
} from '../actionTypes/teamActionTypes'

const updateSelectedTeam = value => ({
    type: UPDATE_SELECTED_TEAM,
    payload: value
})

const addTeam = team => ({
    type: ADD_TEAM,
    payload: team
})

const updateTeam = (id, data) => ({
    type: UPDATE_TEAM,
    payload: { id, data }
})

export {
    updateSelectedTeam,
    addTeam,
    updateTeam
}