import { connect } from 'react-redux'
import PlayerTable from '../components/PlayerTable'

const mapStateToProps = state => ({
    teams: state.teams.teams,
    selectedTeam: state.teams.selectedTeam
})

export default connect(mapStateToProps)(PlayerTable)