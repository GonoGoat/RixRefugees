import React from "react";
import {Link} from "react-router-dom";
import "../Style/Header.css";
import {useSelector} from "react-redux";
import Pannel from './Header/Pannel'
import Connection from './Header/Connection'

function Header() {

    const userId = useSelector(state => state.user)

    return (
        <div id="header">
            {userId === 0 ? <React.Fragment/> : <Pannel/>}
            <div className="links">
                <Link to={"/"}>
                    Accueil
                </Link>
            </div>
            <div className="links">
                <Link to={"/about"}>
                    En savoir plus
                </Link>
            </div>
            <div className="links">
                <Link to={"/join"}>
                    Comment rejoindre ?
                </Link>
            </div>
            {userId === 0 ? <Connection/> : <React.Fragment/>}
            <hr/>
        </div>
    )
}
export default Header;