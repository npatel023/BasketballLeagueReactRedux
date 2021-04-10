import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    withStyles
} from '@material-ui/core'

const StyledTableCell = withStyles(() => ({
    head: {
        backgroundColor: '#eee'
    }
}))(TableCell)

const EmptyDataRow = () => (
    <TableRow>
        <TableCell scope="row" colSpan={4} style={{ textAlign: 'center' }} >No Data</TableCell>
    </TableRow>
)

function PlayerTable({
    teams,
    selectedTeam
}) {
    let teamData = teams
    if (selectedTeam) {
        teamData = teams.filter(team => selectedTeam === team.teamName)
    }

    return (
        <Paper elevation={0} variant="outlined">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Player</StyledTableCell>
                            <StyledTableCell align="center">Team</StyledTableCell>
                            <StyledTableCell align="center">Number</StyledTableCell>
                            <StyledTableCell align="center">Position</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            teamData.length ?
                            (
                                teamData.map(({teamName, city, playerDetails}) => (
                                    playerDetails.map(({
                                        playerName,
                                        playerNumber,
                                        playerPosition
                                    }, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center" component="th" scope="row">{playerName}</TableCell>
                                            <TableCell align="center">{`${city} ${teamName}`}</TableCell>
                                            <TableCell align="center">{playerNumber}</TableCell>
                                            <TableCell align="center">{playerPosition}</TableCell>
                                        </TableRow>
                                    ))
                                ))
                            ) :
                            <EmptyDataRow />
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default PlayerTable