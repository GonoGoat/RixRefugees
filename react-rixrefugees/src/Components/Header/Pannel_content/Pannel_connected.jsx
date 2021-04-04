import React from 'react';
import {List,ListItem, ListItemText,Button} from '@material-ui/core';
import {Link,useHistory} from "react-router-dom";

function Pannel_connected() {

    const history = useHistory();

    return (
        <List>
            <Button onClick={() => history.push("/user")}>Accéder aux options du compte</Button>
            <ListItem>
                <ListItemText><Link to="/user/profile">Paramètres du compte</Link></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText><Link to="/user/activity">Historique des disponibilités soumises</Link></ListItemText>
            </ListItem>
        </List>
    )
}

export default Pannel_connected;