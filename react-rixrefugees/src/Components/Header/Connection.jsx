import React from "react";
import {useHistory} from "react-router-dom";

import classes from '../../Style/Header';
const useStyles = classes;

function Connection() {
    const history = useHistory();
    const styles = useStyles();

    return (
        <div className={`${styles.connection} ${styles.links}`}>
            <button onClick={() => history.push('/login')}>Se connecter</button>
            <button onClick={() => history.push("/register")}>S'inscrire</button>
        </div>
    )
}

export default Connection;