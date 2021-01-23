import { connect } from 'react-redux'
import TeamSelect from '../components/TeamSelect'

import {
    updateSelectedTeam
} from '../store/actions/teamActions'

import {
    populateTeamForm
} from '../store/actions/teamFormActions'

const mapStateToProps = state => ({
    selectedTeam: state.teams.selectedTeam,
    teams: state.teams.teams,
    teamFormData: state.teamForm
})

const mapDispatchToProps = dispatch => ({
    updateSelectedTeam: value => dispatch(updateSelectedTeam(value)),
    populateTeamForm: teamData => dispatch(populateTeamForm(teamData))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamSelect)