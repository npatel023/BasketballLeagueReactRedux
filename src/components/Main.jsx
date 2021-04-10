import React, { useState, useEffect } from 'react';
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

function Main({
    loadTeams
}) {
    const { container } = useStyles()
    const [isTeamFormShown, setIsTeamFormShown] = useState(false)

    useEffect(() => {
        fetch('http://localhost:5000/getAllTeams')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                loadTeams(data.teamData)
            }
        })
        .catch(error => console.log(error))
    }, [loadTeams])

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