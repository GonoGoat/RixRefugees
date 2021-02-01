import React from "react";
import {useSelector,useDispatch} from "react-redux";
import {switchUser} from "../redux/Actions/index";

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
        <div>
            <button onClick={() => dispatch(switchUser({user : 0}))}>Devenir "Visiteur"</button>
            <button onClick={() => dispatch(switchUser({user : 1}))}>Devenir "Bénévole"</button>
            <button onClick={() => dispatch(switchUser({user : 2}))}>Devenir "Coordinateur"</button>
            <br/><br/>
            <div>Bonjour ! Vous êtes {getRole()}<br/></div>
        </div>
    )
}

export default Accueil;