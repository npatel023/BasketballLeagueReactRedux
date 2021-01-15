import React from 'react';
import {
    Select,
    InputLabel,
    makeStyles,
    FormControl,
    Grid,
    Button
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
    teamFormControl: {
        minWidth: 120
    },
    buttonMarginLeft: {
        marginLeft: 30
    },
    gridContainer: {
        marginBottom: 20
    }
}))

function TeamSelect({
    selectedTeam,
    updateSelectedTeam,
    setIsTeamFormShown,
    teams,
    populateTeamForm,
    teamFormData
}) {
    const { teamFormControl, buttonMarginLeft, gridContainer } = useStyles()

    const handleTeamButtonClick = () => {
        if (selectedTeam) {
            populateTeamForm(teams.filter(team => team.teamName === selectedTeam)[0])
        } else if (!selectedTeam && teamFormData.city) {
            populateTeamForm()
        }
        setIsTeamFormShown(true)
    }

    return (
        <Grid 
            className={gridContainer} 
            container 
            justify="center" 
            alignItems="flex-end"
        >
            <Grid>
                <FormControl className={teamFormControl}>
                    <InputLabel id="team-label-select">Team</InputLabel>
                    <Select
                        native
                        labelId="team-label-select"
                        id="team-select"
                        value={selectedTeam}
                        onChange={e => updateSelectedTeam(e.target.value)}
                    >
                        <option value="" />
                        {
                            teams.length ?
                            teams.map(({ teamName, city}) => (
                                <option key={teamName} value={teamName}>{`${city} ${teamName}`}</option>
                            )) :
                            ""
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid className={buttonMarginLeft}>
                <Button
                    variant="contained"
                    disableElevation
                    color="primary"
                    onClick={handleTeamButtonClick}
                >
                    {
                        selectedTeam ? "EDIT TEAM" : "ADD TEAM"
                    }
                </Button>
            </Grid>
        </Grid>
    )
}

export default TeamSelect