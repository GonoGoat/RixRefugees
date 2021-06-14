import React from "react";
import {useHistory} from "react-router-dom"

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import classes from '../Style/Footer';
const useStyles = classes;

function Footer() {
    const styles = useStyles();
    const history = useHistory()

    return (
        <Container classes={{root : styles.root}}>
            <Typography variant='caption' onClick={() => history.push('/legals')} classes={{root : styles.links}}>
                Mentions légales
            </Typography>
            <Typography variant='caption' onClick={() => history.push('/privacy')} classes={{root : styles.links}}>
                Politique de confidentialité
            </Typography>
            <Typography variant='caption' onClick={() => history.push('/cgu')} classes={{root : styles.links}}>
                Conditions générales d'utilisation
            </Typography>
        </Container>

    )
}
export default Footer;