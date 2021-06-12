import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import axios from "../../../utils/axios";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import "date-fns";

import LoadingIndicator from "../../utils/LoadingIndicator";
import Equipments from "./Equipments";
import Places from "./Places";
import PlacesAvail from "./PlacesAvail";
import Accomodations from "./Accomodations"
import Sessions from './Sessions';

import check from "../../../utils/FormValidations/validators"

const classes = makeStyles({
    window : {
        height : 500,
    },
  });
const useStyles = classes;

function PlacesForm(props) {
    const moment = require('moment');

    const dateTime = moment().format("YYYY-MM-DDTHH:mm");
    const date = moment().format("YYYY-MM-DD");

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const styles = useStyles();
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
            equipments : []
        },
        places_avail : {
            start_avail : dateTime,
            end_avail : dateTime,
            bed_quantity : 0,
            places_id : 0,
        },
        sessions : {
            users_id : 0,
            start_date : date,
            end_date : date,
            places_availabilities_id : 0
        }
    });

    React.useEffect(() => {
        if (props.edit) {
            if (props.form === '/accomodations') {
                let x = []
                for (let i =0;i<props.data[0].check.length;i++) {
                    x.push(false)
                }
                setFormValues({
                    ...formValues,
                    accomodations : {
                        places_id : 0,
                        equipments : x
                    }
                });
            }
            else {
                let key = props.form.substr(1);
                setFormValues({
                    ...formValues,
                    [key]: props.data[props.data.findIndex(obj => obj.id === parseInt(props.selected[0]))]
                });
            }
        }
    }, [props.selected,props.data])

    //Submit button for Accomodations and the others
    async function handleSubmit() {
        let values;
        switch (props.form) {
            case '/equipments':
                values = check.checkForm([
                    check.name(formValues.equipments.name)
                ]);
                break;
            case '/places' : 
                values = check.checkForm([
                    check.name(formValues.places.name),
                    check.address(formValues.places.address),
                ])
                break;
            case '/accomodations' : 
                values = check.checkForm([
                    check.places(formValues.accomodations.places_id)
                ])
                break;
            case '/places_avail' :
                values = check.checkForm([
                    check.places(formValues.places_avail.places_id),
                    check.avail_dates(formValues.places_avail.start_avail,formValues.places_avail.end_avail),
                    check.bedQuantity(formValues.places_avail.bed_quantity)
                ])
                break;
            case '/sessions' :
                values = check.checkForm([
                    check.dates(formValues.sessions.start_date,formValues.sessions.end_date),
                    check.users(formValues.sessions.users_id),
                    check.places_avail(formValues.sessions.places_availabilities_id)
                ])
                break;
            default:
                values = ["Formulaire invalide."]
                break;
        }
        if (values === true) {
            setLoading(true);
            if (props.form === '/accomodations') {
                let existing;
                await axios.get(`${process.env.REACT_APP_API}/accomodations/places/${formValues.accomodations.places_id}`)
                .then(res => {
                    existing = res.data.map(obj => obj.id)
                })
                .catch(err => {
                    closeSnackbar();
                    if (err.response) {
                        enqueueSnackbar(err.response.data, {variant : "error"});
                    }
                    else if (err.request) {
                        enqueueSnackbar("La requête n'a pas pû être lancée. Veuillez réessayer.", {variant : "error"});
                    } 
                    else {
                        enqueueSnackbar("La requête n'a pas pû être créée. Veuillez réessayer.", {variant : "error"});
                    }
                });
    
                let head = props.header.slice(1);
                let acc = head.map((val,index) => {
                    return {
                        id : val.id,
                        state : props.data[props.data.findIndex(obj => obj.id === formValues.accomodations.places_id)].check[index]
                    }
                })
    
                let toAdd = acc.filter(obj => obj.state === true).map(val => val.id);
                let toRemove = acc.filter(obj => obj.state === false).map(val => val.id);
    
                acc.forEach(obj => {
                    if (obj.state === true && existing.indexOf(obj.id) !== -1) {
                      toAdd = toAdd.filter(val => val !== obj.id)
                    }
                    if (obj.state === false && existing.indexOf(obj.id) === -1) {
                      toRemove = toRemove.filter(val => val !== obj.id)
                    }
                })
    
                if (toAdd.length > 0) {
                    await axios.post(`${process.env.REACT_APP_API}/accomodations/add`, {places : formValues.accomodations.places_id,equipments : toAdd})
                    .then(res => {
                        enqueueSnackbar(res.data, {variant : "info"});
                    })
                    .catch(err => {
                        closeSnackbar();
                        if (err.response) {
                            enqueueSnackbar(err.response.data, {variant : "error"});
                        }
                        else if (err.request) {
                            enqueueSnackbar("La requête n'a pas pû être lancée. Veuillez réessayer.", {variant : "error"});
                        } 
                        else {
                            enqueueSnackbar("La requête n'a pas pû être créée. Veuillez réessayer.", {variant : "error"});
                        }
                    });
                }
                if (toRemove.length > 0) {
                    await axios.delete(`${process.env.REACT_APP_API}/accomodations/delete`, {data : {places : formValues.accomodations.places_id,equipments : toRemove}})
                    .then(res => {
                        enqueueSnackbar(res.data, {variant : "info"});
                    })
                    .catch(err => {
                        closeSnackbar();
                        if (err.response) {
                            enqueueSnackbar(err.response.data, {variant : "error"});
                        }
                        else if (err.request) {
                            enqueueSnackbar("La requête n'a pas pû être lancée. Veuillez réessayer.", {variant : "error"});
                        } 
                        else {
                            enqueueSnackbar("La requête n'a pas pû être créée. Veuillez réessayer.", {variant : "error"});
                        }
                    });
                }
                setLoading(false);
            }
            else {
                let key = props.form.substr(1);
                if (props.edit) {
                    await axios.put(`${process.env.REACT_APP_API}${props.form}/update`, formValues[key])
                    .then(res => {
                        localStorage.setItem("rixrefugees-message",res.data);
                        localStorage.setItem("rixrefugees-url",props.form);
                        window.location.reload();
                    })
                    .catch(err => {
                        closeSnackbar();
                        if (err.response) {
                            enqueueSnackbar(err.response.data, {variant : "error"});
                        }
                        else if (err.request) {
                            enqueueSnackbar("La requête n'a pas pû être lancée. Veuillez réessayer.", {variant : "error"});
                        } 
                        else {
                            enqueueSnackbar("La requête n'a pas pû être créée. Veuillez réessayer.", {variant : "error"});
                        }
                    });
                }
                else {
                    await axios.post(`${process.env.REACT_APP_API}${props.form}/add`, formValues[key])
                    .then(res => {
                        localStorage.setItem("rixrefugees-message",res.data);
                        localStorage.setItem("rixrefugees-url",props.form);
                        window.location.reload();
                    })
                    .catch(err => {
                        closeSnackbar();
                        if (err.response) {
                            enqueueSnackbar(err.response.data, {variant : "error"});
                        }
                        else if (err.request) {
                            enqueueSnackbar("La requête n'a pas pû être lancée. Veuillez réessayer.", {variant : "error"});
                        } 
                        else {
                            enqueueSnackbar("La requête n'a pas pû être créée. Veuillez réessayer.", {variant : "error"});
                        }
                        setLoading(false);
                    });
                }
            }
        }
        else {
            closeSnackbar();
            values.filter(val => val !== true).forEach(obj => {
                enqueueSnackbar(obj, {variant : "error"});
            })
        }
        
    }

    // Select of Accomodations
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let key = props.form.substr(1);
        let next = formValues[key];
        next[name] = value;
        if (props.form === '/accomodations') {
            next.equipments = props.data[props.data.findIndex(obj => obj.id === value)].check;
        }
        setFormValues({
          ...formValues,
          [key]: next
        });
    };

    // CheckBox of Accomodations
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
                    <Equipments value={formValues.equipments} handleInputChange={handleInputChange}/>
                );
            case '/places' : 
                return (
                    <Places value={formValues.places} handleInputChange={handleInputChange}/>
                );
            case '/accomodations' : 
                return (
                    <Accomodations header = {props.header.slice(1)} data={props.data} value={formValues.accomodations} handleInputChange={handleInputChange} toggleAccomodation={toggleAccomodation}/>
                );
            case '/places_avail' :
                return (
                    <PlacesAvail value={formValues.places_avail} handleInputChange={handleInputChange}/>
                );
            case '/sessions' :
                return (
                    <Sessions value={formValues.sessions} handleInputChange={handleInputChange}/>
                )
            default:
                return ("Erreur : mauvais formulaire choisi. Veuillez réessayer. ");
        }
    };

    function checkSubmit() {
        if (window.confirm(`Vous êtes sur le point ${props.edit ? "de modifier les" : "d'ajouter des"} données. Êtes-vous certains de vouloir faire cette action ?`)) handleSubmit();
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
            <Drawer anchor='bottom' open={true} onClose={() => props.stopForm()}>
                <form className={styles.window}>
                    <Grid container alignItems="center" justify="center" direction="column">
                        {displayForm()}
                        <Button variant="contained" color="primary" onClick={checkSubmit}>
                            Envoyer
                        </Button>
                    </Grid>
                </form>
            </Drawer>
        )
    }
}
export default PlacesForm;