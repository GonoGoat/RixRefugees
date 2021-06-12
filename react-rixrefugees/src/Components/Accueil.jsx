import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid"

function Accueil() {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={6}>
                            <img src={join}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>C'est cool !</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={6}>
                            <img src={join}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>C'est cool !</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Accueil;