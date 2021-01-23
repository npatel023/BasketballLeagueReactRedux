import React, { useState } from 'react';
import {
    Container,
    makeStyles
} from '@material-ui/core'

import TeamFormContainer from '../containers/teamFormContainer'
import TeamSelectContainer from '../containers/teamSelectContainer'
import PlayerTableContainer from '../containers/playerTableContainer'

const useStyles = makeStyles(() => ({
    container: {
        marginTop: 100,
        padding: "25px 20px",
        backgroundColor: "#fff"
    }
}))

function Main() {
    const { container } = useStyles()
    const [isTeamFormShown, setIsTeamFormShown] = useState(false)

    return (
        <section>
            {
                isTeamFormShown ?
                    <TeamFormContainer
                        setIsTeamFormShown={setIsTeamFormShown}
                    /> :
                    (
                        <Container className={container}>
                            <TeamSelectContainer
                                setIsTeamFormShown={setIsTeamFormShown}
                            />
                            <PlayerTableContainer />
                        </Container>
                    )
            }
        </section>
    )
}

export default Main;