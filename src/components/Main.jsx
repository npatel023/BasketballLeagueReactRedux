import React, { useState } from 'react';
import {
    Container,
    makeStyles
} from '@material-ui/core'

import TeamFormContainer from '../containers/TeamFormContainer'
import TeamSelectContainer from '../containers/TeamSelectContainer'
import PlayerTableContainer from '../containers/PlayerTableContainer'

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