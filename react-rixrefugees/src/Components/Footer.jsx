import React from "react";
import {Link} from "react-router-dom"
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import classes from '../Style/Footer';
const useStyles = classes;

function Footer() {
    const styles = useStyles();

    return (
        <Container>
            <Grid container
                spacing={3}
                justify='center'
            >
                <Grid item>
                    <Link to={"/legals"}>
                        Mentions légales
                    </Link>
                </Grid>
                <Grid item>
                    <Link to={"/privacy"}>
                        Politique de confidentialité
                    </Link>
                </Grid>
                <Grid item>
                    <Link to={"/cgu"}>
                        Conditions générales d'utilisation
                    </Link>
                </Grid>
            </Grid>
        </Container>

    )
}
export default Footer;