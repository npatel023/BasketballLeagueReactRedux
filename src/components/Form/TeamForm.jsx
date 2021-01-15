import React, { useState } from 'react';
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
        backgroundColor: '#fff',
        padding: "25px 20px"
    },
    form: {
        maxWidth: 700,
        margin: "auto",
    },
    buttonGrid: {
        backgroundColor: '#fff',
        padding: '15px 10px',
        marginTop: 30
    },
    formTitle: {
        margin: "100px 20px 20px 10px"
    },
    addPlayerButton: {
        marginTop: 20
    },
    deletePlayerButton: {
        textAlign: 'center',
        minWidth: '40px'
    }
}))

function TeamForm({
    setIsTeamFormShown,
    addTeam,
    updateTeam,
    addPlayer,
    deletePlayer,
    updateTeamDetails,
    updatePlayerDetails,
    teamFormData,
    selectedTeam
}) {
    const {
        form,
        buttonGrid,
        formContainer,
        formTitle,
        addPlayerButton,
    } = useStyles()

    const [formError, setFormError] = useState({})

    const handleTeamNameChange = e => {
        if (formError.hasOwnProperty('teamName')) {
            setFormError(prevState => ({
                ...prevState,
                teamName: ''
            }))
        }
        updateTeamDetails({
            teamKey: 'teamName',
            teamValue: e.target.value
        })
    }

    const handleTeamCityChange = e => {
        if (formError.hasOwnProperty('city')) {
            setFormError(prevState => ({
                ...prevState,
                city: ''
            }))
        }
        updateTeamDetails({
            teamKey: 'city',
            teamValue: e.target.value
        })
    }

    const handlePlayerDetailChange = (e, playerIndex, playerField) => {
        if (formError.hasOwnProperty('playerDetailErrors')) {
            setFormError((prevState) => ({
                ...prevState,
                playerDetailErrors: formError.playerDetailErrors.map((player, index) => {
                    if (index === playerIndex) {
                        return {
                            ...player,
                            [playerField]: '',
                        }
                    }
                    return player
                })
            }))
        }
        updatePlayerDetails({
            playerIndex,
            playerKey: playerField,
            playerValue: e.target.value
        })
    }

    const handleSaveClick = () => {
        const errors = validateForm()

        if (Object.keys(errors).length && errors.playerDetailErrors[0] !== false) {
            setFormError(errors)
            return
        }

        if (selectedTeam) {
            updateTeam(`${teamFormData.city}-${teamFormData.teamName}`, teamFormData)
        } else {
            addTeam(teamFormData)
        }
        setIsTeamFormShown(false)
    }

    const validateForm = () => {
        const {
            city,
            teamName,
            playerDetails
        } = teamFormData

        const errors = {}

        if (!city) {
            errors.city = 'City is a required field'
        }
        if (!teamName) {
            errors.teamName = 'Team Name is a required field'
        }
        
        const playerDetailErrors = playerDetails.map(({ playerName, playerPosition, playerNumber}) => {
            const playerErrors = {}

            if (!playerName) {
                playerErrors.playerName = 'Player Name is a required field'     
            }
            if (playerNumber < 0 || playerNumber === '') {
                playerErrors.playerNumber = 'Player Number is a required field'     
            } else if (playerNumber < 0) {
                playerErrors.playerNumber = 'Player Number must be greater than or equal to 0'
            }
            if (!playerPosition) {
                playerErrors.playerPosition = 'Player Position is a required field' 
            }

            if (Object.keys(playerErrors).length === 0) {
                return false
            }
            return playerErrors
        })

        if (playerDetailErrors.length) {
            errors.playerDetailErrors = playerDetailErrors
        }

        return errors
    }

    return (
        <form id="team-form" className={form}>
            <Typography className={formTitle} variant="h5">Basketball Team</Typography>
            <Container className={formContainer}>
                <Grid container spacing={2} justify="space-between">
                    <Grid item xs={6}>
                        <TextField
                            id="team-form__team-city"
                            label="Team City"
                            variant="outlined"
                            size="small"
                            fullWidth
                            required
                            onChange={handleTeamCityChange}
                            value={teamFormData.city}
                            error={formError.hasOwnProperty('city') && formError.city}
                            helperText={formError.hasOwnProperty('city') ? formError.city : ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="team-form__team-name"
                            label="Team Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            required
                            onChange={handleTeamNameChange}
                            value={teamFormData.teamName}
                            error={formError.hasOwnProperty('teamName') && formError.teamName}
                            helperText={formError.hasOwnProperty('teamName') ? formError.teamName : ''}
                        />
                    </Grid>
                </Grid>
                <PlayerForm 
                    playerDetails={teamFormData.playerDetails}
                    deletePlayer={deletePlayer}
                    handlePlayerDetailChange={handlePlayerDetailChange}
                    formError={formError.playerDetailErrors}
                />
                <Grid
                    className={addPlayerButton}
                    container
                    justify="center"
                >
                    <Button
                        size="small"
                        color="default"
                        variant="outlined"
                        onClick={() => addPlayer()}
                        disabled={teamFormData.playerDetails.length === 14}
                    >
                        Add Player
                    </Button>
                </Grid>
            </Container>
            <Grid className={buttonGrid} container justify="space-between">
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
        </form >
    )
}

export default TeamForm