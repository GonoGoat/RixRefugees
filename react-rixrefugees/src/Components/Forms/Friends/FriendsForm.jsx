import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import "date-fns";

import LoadingIndicator from "../../utils/LoadingIndicator";
import Friends from './Friends';
import Status from './Status';
import Appointments from './Appointments';

import check from "../../../utils/FormValidations/validators"

const classes = makeStyles({
    window : {
        height : 500,
    },
});
const useStyles = classes;

function FriendsForm(props) {
    const axios = require('axios');
    const moment = require('moment');

    const date = moment().format("YYYY-MM-DD");

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const styles=useStyles();
    const [loading, setLoading] = React.useState(false);
    const [formValues,setFormValues] = React.useState({
        status : {
            name : ''
        },
        friends : {
            fname : '',
            lname : '',
            nationality : '',
            notes : '',
            birth_date : null,
            in_date : date,
            phone : '',
            status_id : 0
        },
        appointments : {
            appointment : date,
            description : '',
            status_id : 0,
            friends_id : 0,
            iscanceled : false
        }
    });

    React.useEffect(async () => {
        if (props.edit) {
            let selected = props.data[props.data.findIndex(obj => obj.id === parseInt(props.selected[0]))];
            switch (props.api) {
                case 'friends' :
                    axios.get(`${process.env.REACT_APP_API}/friends/${selected.id}`)
                    .then(res => {
                        setFormValues({
                            ...formValues,
                            friends: res.data
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    break;
                case 'status' :
                    setFormValues({
                        ...formValues,
                        status : selected
                    });
                    break;
                case 'appointments' :
                    axios.get(`${process.env.REACT_APP_API}/appointments/desc/${selected.id}`)
                    .then(res => {
                        selected.description = res.data.description
                        setFormValues({
                            ...formValues,
                            appointments: selected
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    break;
            }
        }
    }, [props.selected,props.data,props.sessions])

    //Submit button for Accomodations and the others
    async function handleSubmit() {
        let values;
        switch (props.api) {
            case 'friends' :
                values = check.checkForm([
                    check.phoneNumber(formValues.friends.phone),
                    check.status(formValues.friends.status_id),
                    check.n_lname(formValues.friends.lname),
                    check.n_fname(formValues.friends.fname),
                ])
                break;
            case 'status' :
                values = check.checkForm([
                    check.name(formValues.status.name)
                  ])
                break;
            case 'appointments' :
                values = check.checkForm([
                    check.status(formValues.appointments.status_id),
                    check.friends(formValues.appointments.friends_id),
                  ])
                break;
            default :
                values = ["Formulaire invalide."]
                break;
        }

        if (values === true) {
            setLoading(true)
            if (props.edit) {
                await axios.put(`${process.env.REACT_APP_API}/${props.api}/update`, formValues[props.api])
                .then(res => {
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
            }
            else {
                await axios.post(`${process.env.REACT_APP_API}/${props.api}/add`, formValues[props.api])
                .then(res => {
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
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
        const {checked, name, value } = e.target;
        let next = formValues[props.api];
        if (checked) {
            next[name] = checked;
        }
        else {
            next[name] = value;
        }
        setFormValues({
          ...formValues,
          [props.api]: next
        });
    };

    function displayForm() {
        switch (props.api) {
            case 'friends':
                return (
                    <Friends edit={props.edit} value={formValues.friends} handleInputChange={handleInputChange}/>
                );
            case 'status' :
                return (
                    <Status value={formValues.status} handleInputChange={handleInputChange}/>
                )
            case 'appointments' :
                return (
                    <Appointments edit={props.edit} value={formValues.appointments} handleInputChange={handleInputChange}/>
                )
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
            <Drawer anchor='bottom' open={true} onClose={() => props.stopForm()}>
                <form className={styles.window}>
                    <Grid container alignItems="center" justify="center" direction="column">
                        {displayForm()}
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Envoyer
                        </Button>
                    </Grid>
                </form>
            </Drawer>
        )
    }
}

export default FriendsForm;