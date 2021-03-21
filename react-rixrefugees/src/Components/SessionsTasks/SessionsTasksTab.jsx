import React from "react";

import LoadingIndicator from "../utils/LoadingIndicator";
import ListingGrid from '../utils/ListingGrid';
import DataList from "../utils/DataList";
import AddButton from "../utils/Buttons/AddButton";
import DeleteButton from "../utils/Buttons/DeleteButton";
import EditButton from "../utils/Buttons/EditButton";
import SessionsTasksForm from "../Forms/SessionsTasks/SessionsTasksForm";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import classes from '../../Style/SessionsTasksTab';
import {sessionsTasksDataListKeys} from '../../utils/DataListKeys/sessionsTasks';

import CustomCheckIcon from '../utils/Icons/CustomCheckIcon';
import CustomCloseIcon from '../utils/Icons/CustomCloseIcon';
import CustomCheckCircleIcon from '../utils/Icons/CustomCheckCircleIcon';
import CustomHourglassIcon from '../utils/Icons/CustomHourglassIcon';
import CustomScheduleIcon from '../utils/Icons/CustomScheduleIcon';

const moment = require('moment');

function getState (params) {
    let now = new Date();
    let start = new Date(params.getValue('start_date'))
    let end = new Date(params.getValue('end_date'))
    if (now > start) {
        if (now > end) {
            return (
                <strong>
                    <CustomCheckCircleIcon/>
                    Terminée
                </strong>
            )
        }
        return (
            <strong>
                <CustomHourglassIcon/>
                En cours
            </strong>
        )
    }
    else {
        return (
            <strong>
                <CustomScheduleIcon/>
                A venir
            </strong>
        )
    }
}

function getStyle(params) {
    let now = new Date();
    let start = new Date(params.getValue('start_date'))
    let end = new Date(params.getValue('end_date'))
    if (now > start) {
        if (now > end) {
            return "finished"
        }
        return "started"
    }
    else {
        return "tostart"
    }
}

const sessionTasksList = [
    {
        field : 'state',
        headerName : 'Etat de la tâche',
        flex : 1,
        renderCell: getState,
        cellClassName : getStyle
    },
    {
        field : 'id',
        headerName : 'Identifiant de la tâche de session',
        flex : 1,
        type : 'number'
    },
    {
        field : 'name',
        headerName : 'Nom de la tâche',
        flex : 1,
        type : 'string'
    },
    {
        field : 'isfromadmin',
        headerName : 'Tâche provenant d\'un coordinateur ?',
        flex : 1,
        renderCell: (params) => (
            params.value === true ? <CustomCheckIcon/> : <CustomCloseIcon/>
        )
    },
    {
        field : 'start_date',
        headerName : 'Date de début de la tâche',
        flex : 1,
        type : 'date',
        valueFormatter : (params) => moment(params.value).format('DD/MM/YYYY HH:mm')
    },
    {
        field : 'end_date',
        headerName : 'Date de fin de la tâche',
        flex : 1,
        type : 'date',
        valueFormatter : (params) => moment(params.value).format('DD/MM/YYYY HH:mm')
    },
    {
        field : 'amountofpeople',
        headerName : 'Nombre de bénévoles à assigner',
        flex : 1,
        type : 'number'
    },
];
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
    const [filter,setFilter] = React.useState(false);
    const styles = useStyles();

    const api = '/sessions_tasks'
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
        axios.get(`${process.env.REACT_APP_API}${api}`)
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

    async function deleteRows() {
        setLoading(true);
        await axios.delete(`${process.env.REACT_APP_API}${api}/delete`, {data : selected})
        .then(res => {
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }

    function filterSession() {
        if (filter) {
            return sessions.filter(row => new Date(row.end_date) >= new Date());
        }
        else {
            return sessions;
        }
    }

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
                    <AccordionDetails classes={{root : styles.inline}}>
                        <ListingGrid api={api} filter={true} setForm={() => setForm({form : false, edit : false})} rows={sessionsTasks.filter(val => val.sessions_id === value.id)} columns={sessionTasksList} setId={(iden) => setId(iden)} setSelected={(ids) => setSelected(ids)}/>
                        <div>
                            <AddButton disabled={false} add={()=>setForm({form : true,edit : false})}/>
                            <DeleteButton disabled={selected.length <= 0} delete={()=>deleteRows()}/>
                            <EditButton disabled={selected.length != 1} edit={() =>setForm({form : true,edit : true})}/>
                        </div>
                        {(isForm.form || id) ? (isForm.form ? <SessionsTasksForm edit={isForm.edit} stopForm={() => setForm({form : '',edit : false})} data={sessionsTasks}  header={sessionTasksList} selected={selected} api={api}/> :
                           <DataList keys={sessionsTasksDataListKeys} api={`${api}/${id}`}/>) : <React.Fragment/>
                        }
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
                <Grid container direction='row' alignItems='center' justify='center'> 
                    <Grid item>
                        <FormControlLabel
                            control={<Checkbox checked={filter.state} onChange={() => setFilter(!filter)}/>}
                            label="N'afficher que les sessions en cours"
                        />
                    </Grid>
                </Grid>
                {filterSession().map(getSessions)}
            </div>
        )
    }
}

export default SessionsTasksTab;