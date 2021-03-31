import React from "react";

import LoadingIndicator from "../../utils/LoadingIndicator";

import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function UserActivityForm(props) {
    const axios = require('axios');

    const [loading, setLoading] = React.useState(false);
    const [formValues,setFormValues] = React.useState({
        description : '',
        users_id : 1,
        sessions_tasks_id : props.id,
        iscanceled : false
    });

    React.useEffect(() => {
        if (props.edit) {
            setFormValues(props.data);
        }
    }, [])

    //Submit button for Accomodations and the others
    async function handleSubmit() {
        setLoading(true);
        if (props.edit) {
            await axios.put(`${process.env.REACT_APP_API}/availabilities/update`, formValues)
            .then(res => {
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
        }
        else {
            await axios.post(`${process.env.REACT_APP_API}/availabilities/add`, formValues)
            .then(res => {
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    // Select of Accomodations
    const handleInputChange = (e) => {
        setFormValues({
          ...formValues,
          [e.target.name]: e.target.value
        });
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
            <div>
                <form>
                    <Grid container alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <TextField
                                name="description"
                                label="Description de la tâche de la session"
                                type="text"
                                value={formValues.description}
                                onChange={handleInputChange}
                                multiline
                                rows={5}
                            />
                        </Grid>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Envoyer
                        </Button>
                    </Grid>
                </form>
            </div>
        )
    }
}

export default UserActivityForm;