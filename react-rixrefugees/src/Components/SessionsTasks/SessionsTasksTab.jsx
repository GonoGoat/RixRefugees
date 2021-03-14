import React from "react";

import LoadingIndicator from "../utils/LoadingIndicator";
import ListingGrid from '../utils/ListingGrid';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {sessionTasksList} from "../../utils/DataGridColumns/sessions_tasks";
import classes from '../../Style/SessionsTasksTab';
const useStyles=classes;

function SessionsTasksTab() {

    const [loading,setLoading] = React.useState(true);
    const [sessionsTasks,setSessionsTasks] = React.useState([]);
    const [sessions,setSessions] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [id,setId] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const [isForm, setForm] = React.useState({
        form : '',
        edit : false
    });
    const styles = useStyles();

    const axios = require('axios');
    const moment = require('moment');

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/sessions`)
        .then(res => {
            setSessions(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
        axios.get(`${process.env.REACT_APP_API}/sessions_tasks`)
        .then(res => {
            setSessionsTasks(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, [])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function getSessions(value) {
        return (
            <div className={styles.root}>
                <Accordion
                    expanded={expanded === value.id}
                    onChange={handleChange(value.id)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography className={styles.heading}>Session n°{value.id} : {moment(value.start_date).format("DD/MM/YYYY")} - {moment(value.end_date).format("DD/MM/YYYY")}</Typography>
                        <Typography className={styles.secondaryHeading}>Coordonné par {value.username} au lieu "{value.name}"</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ListingGrid filter={true} setForm={() => setForm({form : false, edit : false})} rows={sessionsTasks.filter(val => val.sessions_id === value.id)} columns={sessionTasksList} setId={(iden) => setId(iden)} setSelected={(ids) => setSelected(ids)}/>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }

    if (loading) {
        return <LoadingIndicator/>
    }
    else {
        return (
            <div>
                {sessions.map(getSessions)}
            </div>
        )
    }
}

export default SessionsTasksTab;