import React from 'react'
import {
    Select,
    InputLabel,
    FormControl,
    Grid,
    Button,
    makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
    teamSelectFormControl: {
        minWidth: 120
    },
    gridContainer: {
        marginBottom: 20
    },
    buttonMarginLeft: {
        marginLeft: 30
    }
}))

function TeamSelect({
    setIsTeamFormShown,
    teams,
    selectedTeam,
    updateSelectedTeam,
    populateTeamForm
}) {
    const { teamSelectFormControl, gridContainer, buttonMarginLeft } = useStyles()

    const handleTeamButtonClick = () => {
        if (selectedTeam) {
            populateTeamForm(teams.filter(team => team.teamName === selectedTeam)[0])
        } else if (!selectedTeam) {
            populateTeamForm()
        }

        setIsTeamFormShown(true)
    }

    return (
        <Grid
            container
            justify="center"
            alignItems="flex-end"
            className={gridContainer}
        >
            <Grid>
                <FormControl className={teamSelectFormControl}>
                    <InputLabel>Team</InputLabel>
                    <Select
                        native
                        labelId="team-label-select"
                        value={selectedTeam}
                        onChange={event => updateSelectedTeam(event.target.value)}
                    >
                        <option value="" />
                        {
                            teams.length ? 
                            teams.map(({teamName, city}) => (
                                <option key={teamName} value={teamName}>{`${city} ${teamName}`}</option>
                            )) :
                            ""
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid>
                <Button
                    variant="contained"
                    disableElevation
                    color="primary"
                    className={buttonMarginLeft}
                    onClick={handleTeamButtonClick}
                >
                    {
                        selectedTeam ?
                        "EDIT TEAM" :
                        "ADD TEAM"
                    }
                </Button>
            </Grid>
        </Grid>
    )
}

export default TeamSelect