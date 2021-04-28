import React from "react";
import {useHistory } from "react-router";

import LoadingIndicator from "./utils/LoadingIndicator";
import CancelButton from "./utils/Buttons/CancelButton";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button"

function UserAssignments() {
    const [user,setUser] = React.useState(1);
    const [assignments,setAssignments] = React.useState();
    const [loading,setLoading] = React.useState(false);

    const axios = require('axios');
    const history = useHistory();

    React.useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API}/assignments/user/${user}`)
        .then(res => {
            setLoading(false);
            setAssignments(res.data.sort((a, b) => b.start_date - a.start_date));
        })
        .catch(err => {
            console.log(err);
        });
    },[])

    function displayAssignments(value) {
        return (
            <div>
                <Typography>
                    {value.name} : {value.start_date} - {value.end_date}<br/>
                    {value.amountofpeople} bénévole(s) assigné(s) - {value.assignedfriends} amis(s) assigné(s)
                </Typography>
                <Button size="small" onClick={() => history.push(`/user/activity/${value.availabilities_id}`)}>Plus d'informations</Button>
                <Divider/>
            </div>
        )
    }

    if (loading || !assignments) {
        return <LoadingIndicator/>
    }
    else {
        return (
            <div>
                {assignments.map(displayAssignments)}
            </div>
        )
    }
}

export default UserAssignments;