import React from 'react'
import {
    TextField,
    Grid,
    Button,
    Select,
    InputLabel,
    FormControl,
    FormHelperText,
    makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
    deletePlayerButton: {
        textAlign: 'center',
        minWidth: 20
    },
    positionSelect: {
        position: 'relative',
        bottom: 7
    },
    gridContainer: {
        marginTop: 20,
        marginLeft: 1
    }
}))

function PlayerForm({
    playerDetails,
    deletePlayer,
    updatePlayerDetails,
    formErrors,
    setFormErrors,
    hasSelectedTeam
}) {
    const { deletePlayerButton, positionSelect, gridContainer } = useStyles()

    const handlePlayerDetailChange = (event, playerIndex, playerField) => {
        if (typeof(formErrors) === 'object') {
            setFormErrors(prevState => ({
                ...prevState,
                playerDetailErrors: formErrors.map((playerErrors, index) => {
                    if (index === playerIndex) {
                        return {
                            ...playerErrors,
                            [playerField]: ''
                        }
                    }

                    return playerErrors
                })
            }))
        }

        updatePlayerDetails({
            playerIndex,
            playerKey: playerField,
            playerValue: event.target.value
        })
    }

    return (
        <>
            {
                playerDetails.map(({ playerName, playerNumber, playerPosition }, index) => (
                    <Grid
                        key={index}
                        className={gridContainer}
                        container
                        spacing={2}
                    >
                        <Grid
                            item
                            xs={5}
                        >
                            <TextField
                                label="Player Name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                value={playerName}
                                onChange={event => handlePlayerDetailChange(event, index, 'playerName')}
                                error={formErrors && formErrors[index] && formErrors[index].hasOwnProperty('playerName') && formErrors[index].playerName}
                                helperText={formErrors && formErrors[index] && formErrors[index].hasOwnProperty('playerName') && formErrors[index].playerName}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={3}
                        >
                            <TextField
                                label="Number"
                                variant="outlined"
                                type="number"
                                size="small"
                                fullWidth
                                required
                                value={playerNumber}
                                onChange={event => handlePlayerDetailChange(event, index, 'playerNumber')}
                                error={formErrors && formErrors[index] && formErrors[index].hasOwnProperty('playerNumber') && formErrors[index].playerNumber}
                                helperText={formErrors && formErrors[index] && formErrors[index].hasOwnProperty('playerNumber') && formErrors[index].playerNumber}
                            />
                        </Grid>
                        <Grid
                            className={positionSelect}
                            item
                            xs={3}
                        >
                            <FormControl
                                fullWidth
                                size="small"
                                error={formErrors && formErrors[index] && formErrors[index].hasOwnProperty('playerPosition') && formErrors[index].playerPosition}

                            >
                                <InputLabel>Position</InputLabel>
                                <Select
                                    native
                                    fullWidth
                                    required
                                    value={playerPosition}
                                    onChange={event => handlePlayerDetailChange(event, index, 'playerPosition')}
                                >
                                    <option value="" disabled></option>
                                    <option value="PG">Point Guard</option>
                                    <option value="SG">Shooting Guard</option>
                                    <option value="SF">Small Forward</option>
                                    <option value="PF">Power Forward</option>
                                    <option value="C">Center</option>
                                </Select>
                                <FormHelperText>
                                    {
                                        formErrors && formErrors[index] && formErrors[index].hasOwnProperty('playerPosition') ? formErrors[index].playerPosition : ''
                                    }
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid
                            item
                            xs={1}
                        >
                            <Button
                                size="medium"
                                disabled={!hasSelectedTeam && index === 0}
                                className={deletePlayerButton}
                                onClick={() => deletePlayer(index)}
                            >
                                X
                            </Button>
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}

export default PlayerForm