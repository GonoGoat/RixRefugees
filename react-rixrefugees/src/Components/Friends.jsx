import React from "react";

import FriendsData from "./Friends/FriendsData";

import Button from '@material-ui/core/Button';
//ListingGrid imports
import {friendsList} from "../utils/DataGridColumns/friends"
import {statusList} from "../utils/DataGridColumns/status"
import {appointmentsList} from "../utils/DataGridColumns/appointments"

function Places () {
    const [api,setApi] = React.useState();
    const [options,setOptions] = React.useState();

    function setData(string,tab) {
        setApi(string);
        setOptions(tab);
    }

    return (
        <div>
            <div>
                <Button onClick={() => setData('friends',friendsList)}>Amis</Button>
                <Button onClick={() => setData('status',statusList)}>Statuts possibles</Button>
                <Button onClick={() => setData('appointments',appointmentsList)}>Rendez-vous</Button>
            </div>
            {(!api && !options) ? '' : <FriendsData api={api} options={options}/>}
        </div>
    )
}
export default Places;
