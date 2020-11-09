import React from "react"
import {Link, useHistory} from "react-router-dom"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function HeaderConnected() {

    const history = useHistory();

    return (
        <React.Fragment>
            <div className="links">
                <div className="links">
                    <Link to={"/user/activity/add"}>
                        Soumettre une nouvelle disponibilité
                    </Link>
                </div>
                <div className="links">
                    <Link to={"/user/activity"}>
                        Historique des disponibilités
                    </Link>
                </div>
                <div className="links">
                    <Link to={"/user/assignments"}>
                        Assignations
                    </Link>
                </div>
            </div>
            <div className="links" id="connection">
                    <AccountCircleIcon onClick={() => history.push("/user/profile")}/>
            </div>
        </React.Fragment>
    )
}

export default HeaderConnected