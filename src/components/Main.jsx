import React, { useState } from 'react'
import {
    Container,
    makeStyles
} from '@material-ui/core'

import PlayerTableContainer from '../containers/PlayerTableContainer'
import TeamSelectContainer from '../containers/TeamSelectContainer'
import TeamFormContainer from '../containers/TeamFormContainer'

const useStyles = makeStyles(() => ({
    container: {
        marginTop: 100,
        padding: "25px 20px",
        backgroundColor: "#fff"
    },
    hidden: {
        display: 'none'
    }
}))

function Main() {
    const { container, hidden } = useStyles()
    const [isTeamFormShown, setIsTeamFormShown] = useState(false)

    return (
        <section>
            <Container className={`${container} ${isTeamFormShown ? hidden : ''}`}>
                <TeamSelectContainer
                    setIsTeamFormShown={setIsTeamFormShown}
                />
                <PlayerTableContainer />
            </Container>
            {
                isTeamFormShown ? 
                    <TeamFormContainer 
                        setIsTeamFormShown={setIsTeamFormShown}
                    />
                    : 
                    null
            }
        </section>
    )
}

export default Main