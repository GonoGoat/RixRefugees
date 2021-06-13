import React from "react";

import {useSelector} from "react-redux";
import {Link,useHistory} from "react-router-dom";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import Pannel from './Header/Pannel'
import Connection from './Header/Connection'

import classes from '../Style/Header';
const useStyles = classes;

function Header() {

    const userId = useSelector(state => state.user)
    const styles = useStyles();
    const history = useHistory();

    return (
        <Container classes={{root : styles.header}}>
            {userId === 0 ? <React.Fragment/> : <Pannel/>}
            <Button variant='outlined' onClick={() => history.push("/")} classes={{root : styles.links,label : styles.label}}>
                Accueil
            </Button>
            <Button variant='outlined' onClick={() => history.push("/about")} classes={{root : styles.links,label : styles.label}}>
                Activités disponibles
            </Button>
            <Button variant='outlined' onClick={() => history.push("/join")} classes={{root : styles.links,label : styles.label}}>
                Qui sommes-nous ?
            </Button>
            <Button variant='outlined' onClick={() => history.push("/donations")} classes={{root : styles.links,label : styles.label}}>
                Faire un don
            </Button>
            <Connection/>
        </Container>
    )
}
export default Header;