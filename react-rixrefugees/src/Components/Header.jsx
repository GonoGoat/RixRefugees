import React from "react"
import {Link} from "react-router-dom"
import "../Style/Header.css"
import {Connection, HeaderConnected, HeaderAdmin} from "./Header-link"
import {useSelector} from "react-redux"

function Header() {

    const userId = useSelector(state => state.user)

    function isAdmin() {
        if (userId === 2) {
            return (
                <HeaderAdmin/>
            )
        }
    }

    function isConnected() {
        if (userId === 1) {
            return (
                <HeaderConnected/>
            )
        }
        else {
            return (
                <Connection/>
            )
        }
    }

    return (
        <div>
            {isAdmin()}
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
            {isConnected()}
            <hr/>
        </div>
    )
}
export default Header