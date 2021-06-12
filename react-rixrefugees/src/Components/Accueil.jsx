import React from "react";
import {Link} from "react-router-dom"

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid"

import join from "../img/join.jpg"

import classes from "../Style/Accueil";
const useStyles=classes;

function Accueil() {

    const styles = useStyles();

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={6}>
                            <img className={styles.img} src={join}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='h4'>Bienvenue chez RixRefugees !</Typography>
                            <Typography>L'association RixRefugees s'occupe de l'accueil de personnes migrantes dans la province de Rixensart en Belgique. Nous leur proposons un hébergement ainsi que des activités d'intégration sociale. Nous effectuons également des </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={6}>
                            <img className={styles.img} src={join}/>
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