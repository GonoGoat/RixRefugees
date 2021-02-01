import React from "react";
import {useHistory} from "react-router-dom";

function Connection() {
    const history = useHistory();

    return (
        <div className="links" id="connection">
            <button onClick={() => history.push('/login')}>Se connecter</button>
            <button onClick={() => history.push("/register")}>S'inscrire</button>
        </div>
    )
}

export default Connection;