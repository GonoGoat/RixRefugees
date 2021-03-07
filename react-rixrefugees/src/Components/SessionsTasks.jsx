import React from "react";

import Button from '@material-ui/core/Button';

import Managment from './SessionsTasks/Managment';

function SessionTasks() {
    const [api,setApi] = React.useState();

    function displayInformations() {
        switch(api) {
            case 'tasks' :
                return <Managment api={api}/>
            case 'sessions' :
                return <Managment api={api}/>
            case 'sessionsTasks' :
                return 'Other'
        }
    }

    return (
        <div>
            <div>
                <Button onClick={() => setApi('tasks')}>Tâches</Button>
                <Button onClick={() => setApi('sessions')}>Sessions</Button>
                <Button onClick={() => setApi('sessionsTasks')}>Gestion des tâches des sessions</Button>
            </div>
            <div>
                {displayInformations()}
            </div>
        </div>
    )
}

export default SessionTasks;