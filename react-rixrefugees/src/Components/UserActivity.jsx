import React from "react";
import { useParams } from 'react-router-dom';

import DataList from './utils/DataList';
import UserActivityForm from "./Forms/UserActivity/UserActivityForm";

import {sessionsTasksInfoDataListKeys} from '../utils/DataListKeys/sessionsTasksInfo'

import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';

function UserActivity() {

    const { id } = useParams();

    const api = `/sessions_tasks/${id}`
    return (
        <div>
            <Typography>Vous êtes en train de postuler pour la tâche suivante :</Typography>
            <DataList api={api} keys={sessionsTasksInfoDataListKeys}/>
            <Divider/>
            <UserActivityForm id={id}/>
        </div>
    )
}

export default UserActivity;