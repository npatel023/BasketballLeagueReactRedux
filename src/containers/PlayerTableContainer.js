import { connect } from 'react-redux'
import PlayerTable from '../components/PlayerTable'

const mapStateToProps = state => ({
    teams: state.teamData.teams,
    selectedTeam: state.teamData.selectedTeam
})

export default connect(mapStateToProps)(PlayerTable)