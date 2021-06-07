import React from 'react';
import {Link} from "react-router-dom";
import Pannel_connected from "./Pannel_connected";
import {List,ListItem, ListItemText,Divider,Button} from '@material-ui/core';

function Pannel_admin(props) {

    return (
        <List>
            <Pannel_connected handleClick={(route) => props.handleClick(route)}/>
            <Divider/>
            <Button onClick={() =>props.handleClick("/manage")}>Panel d'administration</Button>
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