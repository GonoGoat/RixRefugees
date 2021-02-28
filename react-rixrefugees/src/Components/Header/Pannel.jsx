import React from "react";
import {useSelector} from "react-redux";
import {useState} from "react";

import Pannel_admin from "./Pannel_content/Pannel_admin";
import Pannel_connected from './Pannel_content/Pannel_connected';
import {Button,Drawer} from '@material-ui/core';

function Pannel() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const userId = useSelector(state => state.user);

    return (
        <div className="links" id="admin">
            <Button onClick={() => setDrawerOpen(true)}>Fonctionnalités du compte</Button>
            <Drawer anchor='left' open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
                {userId === 1 ? <Pannel_connected/> : <Pannel_admin/>}
            </Drawer>
        </div>
    )
}

export default Pannel;