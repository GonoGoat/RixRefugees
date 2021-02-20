import React from "react";
import {Grid,Button} from "@material-ui/core"
import "date-fns";

import LoadingIndicator from "../utils/LoadingIndicator";
import Equipments from "./Places/Equipments";
import Places from "./Places/Places";
import PlacesAvail from "./Places/PlacesAvail";
import Accomodations from "./Places/Accomodations"

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
        accomodations : {
            places : 0,
            equipments : []
        },
        places_avail : {
            start_avail : date,
            end_avail : date,
            bed_quantity : '',
            places_id : 0,
        }
    });

    React.useEffect(() => {
        if (props.form != '/accomodations') {
            let key = props.form.substr(1);
            setFormValues({
              ...formValues,
              [key]: props.data[props.data.findIndex(obj => obj.id === parseInt(props.selected[0]))]
            });
        }
    }, [props.selected,props.data])

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
                    <Equipments init={props.data[props.data.findIndex(obj => obj.id === parseInt(props.selected[0]))]} value={formValues.equipments} handleInputChange={handleInputChange}/>
                );
            case '/places' : 
                return (
                    <Places value={formValues.places} handleInputChange={handleInputChange}/>
                );
            case '/accomodations' : 
                return (
                    <Accomodations value={formValues.accomodations} handleInputChange={handleInputChange}/>
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