import React from 'react';
import {Link} from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import classes from "../../../Style/Pannel";
const useStyles=classes;

function Pannel_connected(props) {

    const styles = useStyles();

    return (
        <List>
            <Typography variant='h5' classes={{root : styles.user}} >Fonctionnalité de bénévole</Typography>
            <ListItem>
                <ListItemText><Link onClick={() => props.handleClick("/user/profile")}>Paramètres du compte</Link></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText><Link onClick={() => props.handleClick("/user/activity")}>Historique des disponibilités soumises</Link></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText><Link onClick={() => props.handleClick("/user/assignments")}>Tâches assignées à venir</Link></ListItemText>
            </ListItem>
        </List>
    )
}

export default Pannel_connected;