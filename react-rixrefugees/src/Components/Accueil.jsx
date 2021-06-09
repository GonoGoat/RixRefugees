import React from "react";
import {useSelector,useDispatch} from "react-redux";
import {switchUser} from "../redux/Actions/index";

import Container from "@material-ui/core/Container"

function Accueil() {
    const userId = useSelector(state => state.user);
    const dispatch = useDispatch();

    function getRole() {
        switch(userId) {
            case 1 :
                return "Bénévole";
            case 2 :
                return "Coordinateur";
            default : 
                return "Visiteur";
        }
    }

    return (
        <Container>
            <button onClick={() => dispatch(switchUser({user : 0}))}>Devenir "Visiteur"</button>
            <button onClick={() => dispatch(switchUser({user : 1}))}>Devenir "Bénévole"</button>
            <button onClick={() => dispatch(switchUser({user : 2}))}>Devenir "Coordinateur"</button>
            <br/><br/>
            <div>Bonjour ! Vous êtes {getRole()}<br/></div>
        </Container>
    )
}

export default Accueil;