import React from "react"
import {Link,useHistory} from "react-router-dom"
import {useState} from "react"
import {Button, Drawer, List, ListItem, ListItemText} from '@material-ui/core';

function HeaderAdmin() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const history = useHistory();

    function list() {
        return (
            <div onClick={() => setDrawerOpen(false)}>
                <List>
                    <Button onClick={() => history.push("/manage")}>Panel d'administration</Button>
                    <ListItem>
                        <ListItemText><Link to="/manage/users">Gestion des utilisateurs</Link></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText><Link to="/manage/assignments">Gestion des assignations</Link></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText><Link to="/manage/web">Gestion du site web</Link></ListItemText>
                    </ListItem>
                </List>
            </div>
        )
    }

    return (
        <div className="links" id="admin">
            <Button onClick={() => setDrawerOpen(true)}>Administration</Button>
            <Drawer anchor='left' open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
                {list()}
            </Drawer>
        </div>
    )
}

export default HeaderAdmin;