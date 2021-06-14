import React from "react";
import {useHistory} from "react-router-dom";
import { useSnackbar } from 'notistack';
import {useSelector} from "react-redux";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import NextButton from "./utils/Carousel/NextButton";
import PreviousButton from "./utils/Carousel/PreviousButton";
import Indicator from "./utils/Carousel/Indicator";
import LoadingIndicator from "./utils/LoadingIndicator";
import axios from "../utils/axios";

import classes from "../Style/About";
const useStyles=classes;

function About() {
    const [loading,setLoading] = React.useState(true);
    const [sessionsTasks,setSessionsTasks] = React.useState([]);
    const [sessions,setSessions] = React.useState([]);
    const [selected, setSelected] = React.useState(0);
    const userId = useSelector(state => state.user);
    const styles = useStyles();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const moment = require('moment');
    const history = useHistory();

    React.useEffect( () => {
        axios.get(`${process.env.REACT_APP_API}/sessions/available`)
        .then(res => {
            setSessions(res.data);
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
        });
        axios.get(`${process.env.REACT_APP_API}/sessions_tasks/available`)
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
        setLoading(false);
    }, [])

    function getCards(obj,index) {
        return (
            <Card classes={{root : styles.card}}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {moment(obj.start_date).format('DD/MM/YYYY HH:mm')} - {moment(obj.end_date).format('DD/MM/YYYY HH:mm')}
                </Typography>
                <Typography variant="h5" component="h2">
                    {obj.name}
                </Typography>
                <Typography color="textSecondary">
                    {obj.amountofpeople} personne{obj.amountofpeople > 1 ? "s" : ""}
                </Typography>
                <Button variant='outlined' size="small" onClick={() => history.push(userId > 0 ? `/user/activity/add/${obj.id}` : '/login')}>Postuler maintenant</Button>
              </CardContent>
            </Card>
        );
    }

    const handleInputChange = (e) => {
        const { value } = e.target;
        setSelected(value);
    };


    if (loading || !sessions || !sessionsTasks) {
        return <LoadingIndicator/>
    }
    else {
        return (
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant='h3'>Activités disponibles</Typography>
                        <Typography>
                            Afin d'organiser ses activités, l'association définit un coordinateur responsable des activités d'une semaine (appelée alors "session"). Le coordinateur de la session peut alors définir une série de tâche à effectuer durant sa session. Vous, bénévoles, pouvez alors proposer votre disponibilité pour une tâche. Par après, le coordinateur choisira parmis les disponibilités quel bénévole sera chargé de la tâche.
                        </Typography>
                        <Typography>
                            Vous retrouverez ci-dessous l'ensemble des tâches à venir auxquelles le nombre de bénévole à assigner n'a pas encore été rempli. Vous pouvez cliquer alors sur le bouton "Postuler maintenant" et remplir le formulaire pour soumettre votre disponibilité. En tant que bénévole, vous avez également la possibilité d'ajouter une tâche que le coordinateur n'aurais pas prévu en appuyant sur le bouton "Cliquez Ici". Il faudra attendre qu'un coordinateur accepte votre nouvelle proposition avant que d'autre bénévole puisse se porter volontaire pour cette tâche.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" color='error'>Vous devez être connecté au système afin de pouvoir proposer votre aide</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <InputLabel>Sessions</InputLabel>
                            <Select
                                value={selected}
                                onChange={handleInputChange}
                            >
                                {sessions.map((obj) => {
                                    return <MenuItem value={obj.id}>{obj.username} à {obj.name} : {moment(obj.start_date).format('DD/MM/YYYY')} - {moment(obj.end_date).format('DD/MM/YYYY')}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            borderColor='primary.main'
                            border={2}
                            borderRadius={16}
                            classes={{root : styles.box}}
                        >
                            {sessionsTasks.length > 0 ?
                                    <Carousel
                                        showThumbs={false}
                                        showArrows
                                        infiniteLoop
                                        showStatus={false}
                                        renderArrowNext={(onClickHandler, hasNext, label) => <NextButton onClickHandler={onClickHandler}/>}
                                        renderArrowPrev={(onClickHandler, hasNext, label) => <PreviousButton onClickHandler={onClickHandler}/>}
                                        renderIndicator={(onClickHandler, isSelected, index, label) => <Indicator onClickHandler={onClickHandler} isSelected={isSelected} index={index}/>}
                                    >
                                        {sessionsTasks.filter(obj => selected === 0 ? true : obj.sessions_id === selected).map(getCards)}
                                    </Carousel>
                            :
                                <Typography>Aucune tâche n'est encore disponible.</Typography>
                            }
                            <Typography>Envie de proposer une tâche qui n'existe pas ?</Typography>
                            <Button variant='contained' color='secondary' onClick={() => history.push(userId > 0 ? '/user/activity/add' : '/login')}>Cliquez ici !</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

        );
    }
}

export default About;