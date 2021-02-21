import React from "react";
import {Grid,Button,Modal} from "@material-ui/core"
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
            bed_quantity : 0,
            places_id : 0,
        }
    });

    React.useEffect(() => {
        if (props.edit) {
            switch (props.form) {
                case '/places_avail' :
                    console.log(props.data[props.data.findIndex(obj => obj.id === parseInt(props.selected[0]))].end_avail);
                    setFormValues({
                        ...formValues,
                        places_avail: {
                            id : props.data[props.data.findIndex(obj => obj.id === parseInt(props.selected[0]))].id,
                            start_avail : moment(props.data[props.data.findIndex(obj => obj.id === parseInt(props.selected[0]))].start_avail.replace(/ /, 'T'), 'DD-MM-YYYYThh:mm'),
                            end_avail : moment(props.data[props.data.findIndex(obj => obj.id === parseInt(props.selected[0]))].end_avail.replace(/ /, 'T'), 'DD-MM-YYYYThh:mm'),
                            places_id : props.data[props.data.findIndex(obj => obj.id === parseInt(props.selected[0]))].places_id,
                            bed_quantity : props.data[props.data.findIndex(obj => obj.id === parseInt(props.selected[0]))].bed_quantity
                        }
                    });
                    break;
                case '/accomodation' :
                    break;
                default :
                    console.log(1);
                    let key = props.form.substr(1);
                    setFormValues({
                        ...formValues,
                        [key]: props.data[props.data.findIndex(obj => obj.id === parseInt(props.selected[0]))]
                    });
            }
        }
    }, [props.selected,props.data])

    async function handleSubmit() {
        setLoading(true);
        let key = props.form.substr(1);
        if (props.edit) {
            await axios.put(`${process.env.REACT_APP_API}${props.form}/update`, formValues[key])
            .then(res => {
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
        }
        else {
            await axios.post(`${process.env.REACT_APP_API}${props.form}/add`, formValues[key])
            .then(res => {
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
        }
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

    const toggleAccomodation = (e) => {
        let index = e.target.name;
        let next = formValues.accomodations;
        next.equipments[index] = !next.equipments[index];
        setFormValues({
          ...formValues,
          accomodations: next
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
                    <Accomodations header = {props.header.slice(1)} data={props.data} value={formValues.accomodations} handleInputChange={handleInputChange} toggleAccomodation={(e) => toggleAccomodation(e)}/>
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
            <Modal
                open={true}
                onClose={() => props.stopForm()}
            >
                <form>
                    <Grid container alignItems="center" justify="center" direction="column">
                        {displayForm()}
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Envoyer
                        </Button>
                    </Grid>
                </form>
            </Modal>
        )
    }
}
export default PlacesForm;