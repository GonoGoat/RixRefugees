import React from "react";
import {useSelector} from "react-redux";
import {useState} from "react";
import {useHistory} from "react-router-dom";

import Pannel_admin from "./Pannel_content/Pannel_admin";
import Pannel_connected from './Pannel_content/Pannel_connected';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

import classes from '../../Style/Header';
const useStyles = classes;

function Pannel() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const userId = useSelector(state => state.user);
    const styles = useStyles();
    const history = useHistory();

    function handleClick(route) {
        setDrawerOpen(false);
        history.push(route)
    }

    return (
        <div className={`${styles.admin} ${styles.links}`}>
            <Button onClick={() => setDrawerOpen(true)}>Fonctionnalités du compte</Button>
            <Drawer anchor='left' open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
                {userId === 1 ? <Pannel_connected handleClick={(route) => handleClick(route)}/> : <Pannel_admin handleClick={(route) => handleClick(route)}/>}
            </Drawer>
        </div>
    )
}

export default Pannel;