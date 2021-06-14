import React from 'react';
import {Link} from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import CustomDivider from "../../utils/CustomDivider";
import Pannel_connected from "./Pannel_connected";
import classes from "../../../Style/Pannel";
const useStyles=classes;

function Pannel_admin(props) {
    const styles = useStyles();

    return (
        <List>
            <Pannel_connected handleClick={(route) => props.handleClick(route)}/>
            <CustomDivider/>
            <Typography classes={{root : styles.admin}} variant='h5'>Fonctionnalité de coordinateur</Typography>
            <ListItem>
                <ListItemText><Link onClick={() =>props.handleClick("/manage/friends")}>Amis</Link></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText><Link onClick={() =>props.handleClick("/manage/places")}>Gestion sessions et lieux d'hébergement</Link></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText><Link onClick={() =>props.handleClick("/manage/sessions")}>Tâches et sessions</Link></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText><Link onClick={() =>props.handleClick("/manage/assignments")}>Assignations</Link></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText><Link onClick={() =>props.handleClick("/manage/users")}>Utilisateurs</Link></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText><Link onClick={() =>props.handleClick("/manage/donations")}>Donations</Link></ListItemText>
            </ListItem>
        </List>
    )
}

export default Pannel_admin;