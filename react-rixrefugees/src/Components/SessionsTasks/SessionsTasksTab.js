import React from "react";import { useSnackbar } from 'notistack';
import axios from "../../utils/axios";

import LoadingIndicator from "../utils/LoadingIndicator";
import ListingGrid from '../utils/ListingGrid';
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
import SessionsTasksDesc from "./SessionsTasksDesc";

import classes from '../../Style/SessionsTasksTab';

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
        else {
            return (
                <strong>
                    <CustomHourglassIcon/>
                    En cours
                </strong>
            )
        }
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
    let start = new Date(params.getValue('start_date'));
    let end = new Date(params.getValue('end_date'));
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
        headerName : 'Nombre de bénévoles assigné et à assigner',
        flex : 1,
        valueFormatter : (params) => `${params.getValue("assigned")}/${params.value}`,
        cellClassName : (params) => params.getValue("assigned") === params.value ? "finished" : "tostart"
    },
    {
        field : 'description',
        headerName : 'Affichage description',
        flex : 1,
        renderCell: (params) => <SessionsTasksDesc id={params.getValue('id')}/>
    }
];
const useStyles=classes;

function SessionsTasksTab() {

    const [loading,setLoading] = React.useState(true);
    const [sessionsTasks,setSessionsTasks] = React.useState([]);
    const [sessions,setSessions] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [id,setId] = React.useState(0);
    const [panel,setPanel] = React.useState();
    const [expanded, setExpanded] = React.useState(false);
    const [isForm, setForm] = React.useState({
        form : '',
        edit : false
    });
    const [filter,setFilter] = React.useState(false);
    const styles = useStyles();

    const api = '/sessions_tasks'
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const moment = require('moment');

    React.useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API}/sessions`)
        .then(res => {
            setSessions(res.data);
            setLoading(false);
        })
        .catch(err => {
            closeSnackbar();
            if (err.response) {
                enqueueSnackbar(err.response.data, {variant : "error"});
            }
            else if (err.request) {
                enqueueSnackbar("La requête n'a pas pû être lancée. Veuillez réessayer.", {variant : "error"});
            } 
            else {
                enqueueSnackbar("La requête n'a pas pû être créée. Veuillez réessayer.", {variant : "error"});
            }
            setLoading(false);
        });
    }, [])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    async function deleteRows() {
        setLoading(true);
        await axios.delete(`${process.env.REACT_APP_API}${api}/delete`, {data : selected})
        .then(res => {
            localStorage.setItem("rixrefugees-message",res.data);
            localStorage.setItem("rixrefugees-url",api.substr(1));
            window.location.reload();
        })
        .catch(err => {
            closeSnackbar();
            if (err.response) {
                enqueueSnackbar(err.response.data, {variant : "error"});
            }
            else if (err.request) {
                enqueueSnackbar("La requête n'a pas pû être lancée. Veuillez réessayer.", {variant : "error"});
            } 
            else {
                enqueueSnackbar("La requête n'a pas pû être créée. Veuillez réessayer.", {variant : "error"});
            }
            setLoading(false);
        });
    }

    function filterSession() {
        if (!filter) {
            return sessions.filter(row => new Date(row.end_date) >= new Date());
        }
        else {
            return sessions;
        }
    }


    async function getSessionsTasks(id) {
        if (id != panel) {
            axios.get(`${process.env.REACT_APP_API}${api}/sessions/${id}`)
            .then(res => {
                setSessionsTasks(res.data);
            })
            .catch(err => {
                closeSnackbar();
                if (err.response) {
                    enqueueSnackbar(err.response.data, {variant : "error"});
                }
                else if (err.request) {
                    enqueueSnackbar("La requête n'a pas pû être lancée. Veuillez réessayer.", {variant : "error"});
                } 
                else {
                    enqueueSnackbar("La requête n'a pas pû être créée. Veuillez réessayer.", {variant : "error"});
                }
                setLoading(false);
            });
        }
        setPanel(id);
    }

    function checkSubmit() {
        if (window.confirm(`Vous êtes sur le point de supprimer des données. Cette action est irréversible ! Êtes-vous certains de vouloir faire cette action ?`)) deleteRows();
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
                        onClick={() => getSessionsTasks(value.id)}
                    >
                        <Typography className={styles.heading}>Session n°{value.id} : {moment(value.start_date).format("DD/MM/YYYY")} - {moment(value.end_date).format("DD/MM/YYYY")}</Typography>
                        <Typography className={styles.secondaryHeading}>Coordonné par {value.username} au lieu "{value.name}"</Typography>
                    </AccordionSummary>
                    <AccordionDetails classes={{root : styles.inline}}>
                        {sessionsTasks ?
                            <ListingGrid api={api} filter={true} setForm={() => setForm({form : false, edit : false})} rows={sessionsTasks} columns={sessionTasksList} setId={(iden) => setId(iden)} setSelected={(ids) => setSelected(ids)}/>
                        :
                            <LoadingIndicator/>
                        }
                        <div>
                            <AddButton disabled={new Date() > new Date(value.end_date)} add={()=>setForm({form : true,edit : false})}/>
                            <DeleteButton disabled={selected.length <= 0 || new Date() > new Date(value.end_date)} delete={()=>checkSubmit()}/>
                            <EditButton disabled={selected.length != 1 || new Date() > new Date(value.end_date)} edit={() =>setForm({form : true,edit : true})}/>
                        </div>
                        {(isForm.form || id) ? 
                            <SessionsTasksForm edit={isForm.edit} stopForm={() => setForm({form : '',edit : false})} data={sessionsTasks}  header={sessionTasksList} sessions={panel} selected={selected} api={api.substr(1)}/> 
                        :
                            <React.Fragment/>
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
                            label="Afficher toutes les sessions"
                        />
                    </Grid>
                </Grid>
                {filterSession().map(getSessions)}
            </div>
        )
    }
}

export default SessionsTasksTab;