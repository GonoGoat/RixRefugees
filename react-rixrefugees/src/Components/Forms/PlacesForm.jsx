import React from "react";
import {Grid,Button} from "@material-ui/core"

import LoadingIndicator from "../utils/LoadingIndicator";
import Equipments from "./Places/Equipments";
import Places from "./Places/Places";
import PlacesAvail from "./Places/PlacesAvail";
import "date-fns";

function PlacesForm(props) {

    const axios = require('axios');
    const moment = require('moment');

    const date = moment().format("YYYY-MM-DDThh:mm");
    const [loading, setLoading] = React.useState(false);
    const [formValues,setFormValues] = React.useState({
        equipments : {
            name : ''
        },
        places : {
            name : '',
            address : '',
            description : ''
        },
        places_avail : {
            start_avail : date,
            end_avail : date,
            bed_quantity : '',
            places_id : 0,
        }
    });

    async function handleSubmit() {
        setLoading(true);
        let key = props.form.substr(1);
        await axios.post(`${process.env.REACT_APP_API}${props.form}/add`, formValues[key])
        .then(res => {
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let key = props.form.substr(1);
        let next = formValues[key];
        next[name] = value;
        setFormValues({
          ...formValues,
          [key]: next
        });
    };

    function displayForm() {
        switch (props.form) {
            case '/equipments':
                return (
                    <Equipments value={formValues.equipments} handleInputChange={handleInputChange}/>
                );
            case '/places' : 
                return (
                    <Places value={formValues.places} handleInputChange={handleInputChange}/>
                );
            case '/places_avail' :
                return (
                    <PlacesAvail value={formValues.places_avail} handleInputChange={handleInputChange}/>
                );
            default:
                return ("Erreur : mauvais formulaire choisi. Veuillez réessayer. ");
        }
    };

    if (loading) {
        return (
            <div>
                <LoadingIndicator/>
            </div>
        )
    }
    else {
        return (
            <form>
                <Grid container alignItems="center" justify="center" direction="column">
                    {displayForm()}
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Envoyer
                    </Button>
                </Grid>
            </form>
        )
    }
}
export default PlacesForm;