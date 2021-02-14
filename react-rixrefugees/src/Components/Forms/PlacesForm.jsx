import React from "react";
import {Grid,TextField,FormControlLabel,FormControl,FormLabel,Button} from "@material-ui/core"

import LoadingIndicator from "../utils/LoadingIndicator";

function PlacesForm(props) {

    const axios = require('axios');

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
            places_id : 0,
            accomodations : []
        },
        places_avail : {
            start_avail : '',
            end_avail : '',
            bed_quantity : '',
            places_id : 0
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
        console.log(formValues[key]);
        setFormValues({
          ...formValues,
          [key]: next
        });
    };

    function displayForm() {
        switch (props.form) {
            case '/equipments':
                return (
                   <Grid item>
                       <TextField
                            id="equipments-form"
                            name="name"
                            label="Nom de l'équipement"
                            type="text"
                            value={formValues.equipments.name}
                            onChange={handleInputChange}
                            required
                        />
                   </Grid> 
                )
            case '/places' : 
                    return (
                        <React.Fragment>
                            <Grid item>
                                <TextField
                                    id="places-name"
                                    name="name"
                                    label="Nom de l'endroit"
                                    type="text"
                                    value={formValues.places.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="places-address"
                                    name="address"
                                    label="Adresse de l'endroit"
                                    type="text"
                                    value={formValues.places.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="places-desc"
                                    name="description"
                                    label="Description de l'endroit"
                                    type="text"
                                    value={formValues.places.description}
                                    onChange={handleInputChange}
                                    multiline
                                    rowsMax = {10}
                                />
                            </Grid>
                        </React.Fragment>
                    )
            default:
                return ("Erreur : mauvais formulaire choisi. Veuillez réessayer. ");
        }
    }
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