import React from 'react';
import {Link,useHistory} from "react-router-dom";
import Pannel_connected from "./Pannel_connected";
import {List,ListItem, ListItemText,Divider,Button} from '@material-ui/core';

function Pannel_admin() {

    const history = useHistory();

    return (
        <List>
            <Pannel_connected/>
            <Divider/>
            <Button onClick={() => history.push("/manage")}>Panel d'administration</Button>
            <ListItem>
                <ListItemText><Link to="/manage/calendar">Calendrier</Link></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText><Link to="/manage/friends">Amis</Link></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText><Link to="/manage/sessions">Sessions</Link></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText><Link to="/manage/assignments">Assignations</Link></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText><Link to="/manage/users">Utilisateurs</Link></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText><Link to="/manage/web">Site web</Link></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText><Link to="/manage/relations">Relations</Link></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText><Link to="/manage/accounting">Compatiblité</Link></ListItemText>
            </ListItem>
        </List>
    )
}

export default Pannel_admin;