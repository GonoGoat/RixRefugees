import React from "react";
import { useParams } from 'react-router-dom';

import {sessionsTasksInfoDataListKeys} from '../../utils/DataListKeys/sessionsTasksInfo'
import {availabilitiesDataListKeys} from '../../utils/DataListKeys/availabilities';

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import DataList from "../utils/DataList";

function RetrieveAndChangeUserActivity() {

    const [sessionsTasks, setSessionsTasks] = React.useState()

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
            <Typography>Voici les données de la disponibilité que vous avez soumises</Typography>
            <DataList setDetails={(id) => setSessionsTasks(id)} api={`/availabilities/${useParams().id}`} keys={availabilitiesDataListKeys}/>
        </div>
    )
}

export default RetrieveAndChangeUserActivity;