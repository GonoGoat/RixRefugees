import React from 'react';
import {List,ListItem, ListItemText,Button} from '@material-ui/core';
import {Link} from "react-router-dom";

function Pannel_connected(props) {

    return (
        <List>
            <Button onClick={() => props.handleClick("/user")}>Accéder aux options du compte</Button>
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