import React from "react"
import {Link} from "react-router-dom"
import "../Style/Header.css"

function Header() {

    return (
        <div>
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
            <hr/>
        </div>
    )
}
export default Header