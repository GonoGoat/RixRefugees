import React from "react";

import PlacesData from "./Places/PlacesData";

import {Button} from '@material-ui/core';
//ListingGrid imports
import {placesList} from "../utils/DataGridColumns/places"
import {equipList} from "../utils/DataGridColumns/equipments";
import {pavailList} from "../utils/DataGridColumns/places_avail";

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
                <Button onClick={() => setData('/places',placesList)}>Lieux d'hébergement</Button>
                <Button onClick={() => setData('/equipments',equipList)}>Equipements existants</Button>
                <Button onClick={() => setData('/accomodations',0)}>Equipements des lieux d'hébergement</Button>
                <Button onClick={() => setData('/places_avail',pavailList)}>Lieux d'hébergement disponibles</Button>
            </div>
            {(!api && !options) ? '' : <PlacesData api={api} options={options}/>}
        </div>
    )
}
export default Places;