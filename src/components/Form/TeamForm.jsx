import React, { useState } from 'react'
import {
    TextField,
    Grid,
    Button,
    Container,
    Typography,
    makeStyles
} from '@material-ui/core'

import PlayerForm from './PlayerForm'

const useStyles = makeStyles(() => ({
    formContainer: {
        maxWidth: 700,
        margin: "auto"
    },
    formTitle: {
        margin: "100px 20px 20px 10px"
    },
    container: {
        backgroundColor: '#fff',
        padding: '25px 20px'
    },
    saveButtonGridContainer: {
        backgroundColor: '#fff',
        marginTop: 30,
        padding: '15px 10px'
    },
    marginTop: {
        marginTop: 20
    }
}))


function TeamForm({
    setIsTeamFormShown,
    updateTeamDetails,
    addPlayer,
    deletePlayer,
    updatePlayerDetails,
    addTeam,
    updateTeam,
    teamForm,
    selectedTeam
}) {
    const {
        formContainer,
        formTitle,
        container,
        saveButtonGridContainer,
        marginTop
    } = useStyles()

    const [formErrors, setFormErrors] = useState({})

    const {
        city,
        teamName,
        playerDetails
    } = teamForm

    const onTeamCityChange = event => {
        if (formErrors.hasOwnProperty('city')) {
            setFormErrors(prevState => ({
                ...prevState,
                city: ''
            }))
        }

        updateTeamDetails({
            teamKey: 'city',
            teamValue: event.target.value
        })
    }

    const onTeamNameChange = event => {
        if (formErrors.hasOwnProperty('teamName')) {
            setFormErrors(prevState => ({
                ...prevState,
                teamName: ''
            }))
        }

        updateTeamDetails({
            teamKey: 'teamName',
            teamValue: event.target.value
        })
    }

    const handleSaveClick = () => {
        const errors = validateForm()

        if (Object.keys(errors).length) {
            setFormErrors(errors)
            return
        }

        if (selectedTeam) {
            fetch(
                'http://localhost:5000/updateTeam',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'PATCH',
                    body: JSON.stringify({
                        teamData: teamForm
                    })
                }
            )
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    updateTeam(data.team.teamId, data.team)
                }
            })
            .catch(error => console.log(error))
        } else {
            fetch(
                'http://localhost:5000/addTeam',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        teamData: teamForm
                    })
                }
            )
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.success) {
                        addTeam(data.team)
                    }
                })
                .catch(error => console.log(error))

        }

        setIsTeamFormShown(false)
    }

    const validateForm = () => {
        const errors = {}

        if (!city) {
            errors.city = 'City is a required field'
        }

        if (!teamName) {
            errors.teamName = 'Team Name is a required field'
        }

        const playerDetailErrors = playerDetails.map(({ playerName, playerPosition, playerNumber }) => {
            const playerErrors = {}

            if (!playerName) {
                playerErrors.playerName = 'Player Name is a required field'
            }

            if (playerNumber < 0 || playerNumber === '') {
                playerErrors.playerNumber = 'Player Number is a required field'
            }

            if (!playerPosition) {
                playerErrors.playerPosition = 'Player Position is a required field'
            }

            if (Object.keys(playerErrors).length === 0) {
                return false
            }

            return playerErrors
        })

        for (let i = 0; i < playerDetailErrors.length; i++) {
            if (typeof (playerDetailErrors[i]) === 'object') {
                errors.playerDetailErrors = playerDetailErrors
                break
            }
        }

        return errors
    }

    return (
        <form className={formContainer} id="team-form">
            <Typography
                variant="h5"
                className={formTitle}
            >
                Basketball Team
            </Typography>
            <Container className={container}>
                <Grid
                    container
                    justify="space-between"
                    spacing={2}
                >
                    <Grid
                        item
                        xs={6}
                    >
                        <TextField
                            id="team-form__team-city"
                            label="Team City"
                            variant="outlined"
                            size="small"
                            fullWidth
                            required
                            value={city}
                            onChange={onTeamCityChange}
                            error={formErrors.hasOwnProperty('city') && formErrors.city}
                            helperText={formErrors.hasOwnProperty('city') && formErrors.city}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <TextField
                            id="team-form__team-name"
                            label="Team Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            required
                            value={teamName}
                            onChange={onTeamNameChange}
                            error={formErrors.hasOwnProperty('teamName') && formErrors.teamName}
                            helperText={formErrors.hasOwnProperty('teamName') && formErrors.teamName}
                        />
                    </Grid>
                    <PlayerForm
                        playerDetails={playerDetails}
                        deletePlayer={deletePlayer}
                        updatePlayerDetails={updatePlayerDetails}
                        formErrors={formErrors.hasOwnProperty('playerDetailErrors') ? formErrors.playerDetailErrors : false}
                        setFormErrors={setFormErrors}
                        hasSelectedTeam={selectedTeam ? true : false}
                    />
                    <Grid
                        justify="center"
                        container
                    >
                        <Button
                            className={marginTop}
                            size="small"
                            color="default"
                            variant="outlined"
                            onClick={() => addPlayer()}
                            disabled={teamForm.playerDetails.length === 15}
                        >
                            ADD PLAYER
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <Grid
                className={saveButtonGridContainer}
                container
                justify="space-between"
            >
                <Button
                    variant="outlined"
                    color="default"
                    disableElevation
                    onClick={() => setIsTeamFormShown(false)}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={handleSaveClick}
                >
                    Save Team
                </Button>
            </Grid>
        </form>
    )
}

export default TeamForm