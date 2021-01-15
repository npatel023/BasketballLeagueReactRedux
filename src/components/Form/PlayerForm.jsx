import React from 'react';
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
    playerGrid: {
        marginTop: 20
    },
    deletePlayerButton: {
        textAlign: 'center',
        minWidth: '40px'
    },
    numberTextField: {
        position: 'relative',
        bottom: '7px'
    }
}))

function PlayerForm({
    playerDetails,
    handlePlayerDetailChange,
    deletePlayer,
    formError
}) {
    const {
        playerGrid,
        deletePlayerButton,
        numberTextField
    } = useStyles()
    return (
        <>
            {
                playerDetails.map(({ playerName, playerNumber, playerPosition }, index) => (
                    <Grid key={index} container spacing={2} className={playerGrid}>
                        <Grid item xs={5}>
                            <TextField
                                label="Player Name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required={index === 0 ? true : false}
                                onChange={(e) => handlePlayerDetailChange(e, index, 'playerName')}
                                value={playerName}
                                error={formError && formError[index] && formError[index].hasOwnProperty('playerName') && formError[index].playerName}
                                helperText={formError && formError[index] && formError[index].hasOwnProperty('playerName') ? formError[index].playerName : ''}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                type="Number"
                                label="Number"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required={index === 0 ? true : false}
                                value={playerNumber}
                                onChange={(e) => handlePlayerDetailChange(e, index, 'playerNumber')}
                                error={formError && formError[index] && formError[index].hasOwnProperty('playerNumber') && formError[index].playerNumber}
                                helperText={formError && formError[index] && formError[index].hasOwnProperty('playerNumber') ? formError[index].playerNumber : ''}
                            />
                        </Grid>
                        <Grid item xs={3} className={numberTextField}>
                            <FormControl 
                                fullWidth 
                                size="small"
                                error={formError && formError[index] && formError[index].hasOwnProperty('playerPosition')  && formError[index].playerPosition}
                            >
                                <InputLabel htmlFor={`team-form__player-position-${index}`}>Position</InputLabel>
                                <Select
                                    native
                                    inputProps={{
                                        id: `team-form__player-position-${index}`
                                    }}
                                    fullWidth
                                    required={index === 0 ? true : false}
                                    value={playerPosition}
                                    onChange={e => handlePlayerDetailChange(e, index, 'playerPosition')}
                                >
                                    <option value="" disabled></option>
                                    <option value="PG">Point Guard</option>
                                    <option value="SG">Shooting Guard</option>
                                    <option value="SF">Small Forward</option>
                                    <option value="PF">Power Forward</option>
                                    <option value="C">Center</option>
                                </Select>
                                <FormHelperText>{formError && formError[index] && formError[index].hasOwnProperty('playerPosition') ? formError[index].playerPosition : ''}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <Button
                                className={deletePlayerButton} disableElevation
                                size="medium"
                                onClick={() => deletePlayer(index)}
                                disabled={index === 0}
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