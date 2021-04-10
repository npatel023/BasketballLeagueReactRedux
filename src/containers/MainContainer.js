import { connect } from 'react-redux'
import {
    loadTeams
} from '../store/actions/teamActions'

import Main from '../components/Main'

const mapDispatchToProps = dispatch => ({
    loadTeams: teamData => dispatch(loadTeams(teamData))
})

export default connect(undefined, mapDispatchToProps)(Main)