import React from "react"
import {Link} from "react-router-dom"

function HeaderAdmin() {
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
        </div>
    )
}

export default HeaderAdmin;