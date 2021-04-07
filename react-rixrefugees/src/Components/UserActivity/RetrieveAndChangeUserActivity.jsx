import React from "react";
import { useParams } from 'react-router-dom';

import {sessionsTasksInfoDataListKeys} from '../../utils/DataListKeys/sessionsTasksInfo'
import {availabilitiesDataListKeys} from '../../utils/DataListKeys/availabilities';

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import DataList from "../utils/DataList";
import EditButton from '../utils/Buttons/EditButton';
import CancelButton from "../utils/Buttons/CancelButton";
import UserActivityForm from "../Forms/UserActivity/UserActivityForm";
import LoadingIndicator from "../utils/LoadingIndicator";

function RetrieveAndChangeUserActivity() {

    const [sessionsTasks, setSessionsTasks] = React.useState()
    const [loading,setLoading] = React.useState(false);
    const [availabilities,setAvailabilities] = React.useState();
    const [edited,setEdited] = React.useState(false);

    const axios = require('axios');

    const param = useParams().id

    async function edit() {
        setLoading(true)
        await axios.get(`${process.env.REACT_APP_API}/availabilities/${param}`)
        .then(res => {
            setAvailabilities(res.data);
            setLoading(false)
        })
        .catch(err => {
            console.log(err);
        }); 
        setEdited(true)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAvailabilities({
          ...availabilities,
          [name]: value
        });
    };

    async function handleSubmit() {
        setLoading(true);
        await axios.put(`${process.env.REACT_APP_API}/availabilities/update`, availabilities)
        .then(res => {
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }

    function cancel() {
        setLoading(true);
        axios.put(`${process.env.REACT_APP_API}/availabilities/cancel`, {id : param})
        .then(res => {
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div>
            {sessionsTasks ?
                <React.Fragment>
                    <Typography>Voici les informations liées à la tâche pour laquelle vous vous êtes rendus disponible</Typography>
                    <DataList api={`/sessions_tasks/${sessionsTasks}`} keys={sessionsTasksInfoDataListKeys}/>
                </React.Fragment>
            :
                <React.Fragment/>
            }
            <Divider/>
            {edited ? 
                (loading && !availabilities ?
                    <LoadingIndicator/>
                    :
                    <React.Fragment>
                        <Typography>Modifiez ici les données de votre disponibilités</Typography>
                        <UserActivityForm value={availabilities} handleInputChange={handleInputChange}/>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Envoyer
                        </Button>
                    </React.Fragment>
                )
            :
                <React.Fragment>
                    <Typography>Voici les données de la disponibilité que vous avez soumises</Typography>
                    <DataList setDetails={(id) => setSessionsTasks(id)} api={`/availabilities/${param}`} keys={availabilitiesDataListKeys}/>
                </React.Fragment>
            }
            <div>
                <EditButton disabled={false} edit={() => edit()}/>
                <CancelButton disabled={false} cancel={() => cancel()}/>
            </div>
        </div>
    )
}

export default RetrieveAndChangeUserActivity;