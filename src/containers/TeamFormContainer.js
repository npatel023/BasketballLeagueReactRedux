import { connect } from 'react-redux'
import TeamForm from '../components/Form/TeamForm'

import {
    addTeam,
    updateTeam
} from '../store/actions/teamActions'

import {
    addPlayer,
    deletePlayer,
    populateTeamForm,
    updateTeamDetails,
    updatePlayerDetails
} from '../store/actions/teamFormActions'

const mapStateToProps = state => ({
    selectedTeam: state.teams.selectedTeam,
    teamForm: state.teamForm
})

const mapDispatchToProps = dispatch => ({
    addTeam: team => dispatch(addTeam(team)),
    updateTeam: (id, data) => dispatch(updateTeam(id, data)),
    addPlayer: () => dispatch(addPlayer()),
    deletePlayer: playerIndex => dispatch(deletePlayer(playerIndex)),
    populateTeamForm: teamData => dispatch(populateTeamForm(teamData)),
    updateTeamDetails: teamData => dispatch(updateTeamDetails(teamData)),
    updatePlayerDetails: playerData => dispatch(updatePlayerDetails(playerData))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamForm)
