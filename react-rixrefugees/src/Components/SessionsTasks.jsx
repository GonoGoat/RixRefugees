import React from "react";

import Button from '@material-ui/core/Button';

import Managment from './SessionsTasks/Managment';
import SessionsTasksTab from './SessionsTasks/SessionsTasksTab';

import {sessionList} from "../utils/DataGridColumns/sessions";
import {tasksList} from "../utils/DataGridColumns/tasks";

function SessionTasks() {
    const [api,setApi] = React.useState();

    function displayInformations() {
        switch(api) {
            case 'tasks' :
                return <Managment api={api} options={tasksList}/>
            case 'sessions' :
                return <Managment api={api} options={sessionList}/>
            case 'sessionsTasks' :
                return <SessionsTasksTab/>
        }
    }

    return (
        <div>
            <div>
                <Button onClick={() => setApi('tasks')}>Tâches</Button>
                <Button onClick={() => setApi('sessions')}>Sessions</Button>
                <Button onClick={() => setApi('sessionsTasks')}>Gestion des tâches des sessions</Button>
            </div>
            {displayInformations()}
        </div>
    )
}

export default SessionTasks;