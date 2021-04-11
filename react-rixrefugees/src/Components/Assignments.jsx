import React from "react";

import LoadingIndicator from "./utils/LoadingIndicator";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import classes from "../Style/Assignments";
const useStyles=classes;

function Assignments() {
    const [loading, setLoading] = React.useState(false);
    const [sessions, setSessions] = React.useState();
    const [sessionsTasks,setSessionsTasks] = React.useState()
    const [expanded, setExpanded] = React.useState(false);

    const styles = useStyles();

    const axios = require('axios');
    const moment = require('moment');

    React.useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API}/sessions/available`)
        .then(res => {
            setSessions(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    },[])

    function getListSessionsTasks(value) {
        return (
            <ListItemText
                primary={`Tâche de sessions n°${value.id} : ${moment(value.start_date).format('DD/MM/YYYY HH:mm')} - ${moment(value.end_date).format('DD/MM/YYYY HH:mm')}`}
                secondary={`${value.name} pour ${value.amountofpeople} personne${value.amountofpeople > 1 ? "s" : ""}`}
            />
        )
    }

    async function handleClick(id) {
        if (expanded === false || expanded != id) {
            await axios.get(`${process.env.REACT_APP_API}/sessions_tasks/sessions/${id}`)
            .then(res => {
                setSessionsTasks(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
            setExpanded(id)
        }
        else {
            setExpanded(false)
        }
    }

    function getList(value) {
        return (
            <React.Fragment>
                <ListItem button onClick={() => handleClick(value.id)}>
                    <ListItemText
                        primary={`Session n°${value.id} : ${moment(value.start_date).format("DD/MM/YYYY")} - ${moment(value.end_date).format("DD/MM/YYYY")}`}
                        secondary={`Coordonné par ${value.username} au lieu "${value.name}"`}
                    />
                    {expanded ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {!sessionsTasks ?
                    (loading ?
                        <LoadingIndicator/>
                    :
                        <React.Fragment/>
                    )
                :
                    <Collapse in={expanded && expanded === value.id} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {sessionsTasks.map(getListSessionsTasks)}                         
                        </List>
                    </Collapse>
                } 
            </React.Fragment>
        )
    }

    if ((loading && !sessionsTasks) || !sessions) {
        return <LoadingIndicator/>
    }
    else {
        return (
            <div>
                <List component="nav"classes={{root : styles.listRoot}}>
                    {sessions.map(getList)}
                </List>
            </div>
        )
    }
}

export default Assignments;