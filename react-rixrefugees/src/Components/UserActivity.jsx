import React from "react";
import { useParams } from 'react-router-dom';

import DataList from './utils/DataList';

import {sessionsTasksInfoDataListKeys} from '../utils/DataListKeys/sessionsTasksInfo'

import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';

function UserActivity() {

    const { id } = useParams();
    const [loading,setLoading] = React.useState(false);

    const api = `/sessions_tasks/${id}`
    return (
        <div>
            <Typography>Vous êtes en train de postuler pour la tâche suivante :</Typography>
            <DataList api={api} keys={sessionsTasksInfoDataListKeys}/>
            <Divider/>
            <Typography>Le formulaire</Typography>
        </div>
    )
}

export default UserActivity;