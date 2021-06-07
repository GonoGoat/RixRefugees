import React from "react";

import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import Pannel from './Header/Pannel'
import Connection from './Header/Connection'

import classes from '../Style/Header';
const useStyles = classes;

function Header() {

    const userId = useSelector(state => state.user)
    const styles = useStyles();

    return (
        <div className={styles.header}>
            {userId === 0 ? <React.Fragment/> : <Pannel/>}
            <div className={styles.links}>
                <Link to={"/"}>
                    Accueil
                </Link>
            </div>
            <div className={styles.links}>
                <Link to={"/about"}>
                    En savoir plus
                </Link>
            </div>
            <div className={styles.links}>
                <Link to={"/join"}>
                    Comment rejoindre ?
                </Link>
            </div>
            <div className={styles.links}>
                <Link to={"/donations"}>
                    Faire un don
                </Link>
            </div>
            <Connection/>
            <hr/>
        </div>
    )
}
export default Header;