import React from "react";
import {useHistory} from "react-router-dom";
import { useSnackbar } from 'notistack';
import axios from "../utils/axios";

import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import LoadingIndicator from "./utils/LoadingIndicator";
import NewLineText from "../utils/NewLineText";

function About() {
    const [loading,setLoading] = React.useState(true);
    const [sessionsTasks,setSessionsTasks] = React.useState([]);
    const [sessions,setSessions] = React.useState([]);
    const [selected, setSelected] = React.useState();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const moment = require('moment');
    const history = useHistory();

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/sessions`)
        .then(res => {
            setSessions(res.data);
            setSelected(res.data.length > 0 ? res.data[0].id : 0)
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
        if (selected !== 0) {
            axios.get(`${process.env.REACT_APP_API}/sessions_tasks`)
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
        setLoading(false);
    }, [])

    function getCards(obj,index) {
        return (
            <Card>
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
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => history.push(`/user/activity/add/${obj.id}`)}>Postuler maintenant</Button>
              </CardActions>
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
            <div>
                <p>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In fermentum et sollicitudin ac orci phasellus egestas. Semper quis lectus nulla at volutpat diam ut. Quam viverra orci sagittis eu volutpat odio facilisis. Habitant morbi tristique senectus et netus et malesuada.
                    </Typography>
                </p>
                <Grid item>
                    <FormControl>
                        <InputLabel>Sessions</InputLabel>
                        <Select
                            value={selected}
                            onChange={handleInputChange}
                        >
                            {sessions.map((obj) => {
                                return <MenuItem value={obj.id}>{obj.username} à {obj.name} : {moment(obj.start_avail).format('DD/MM/YYYY hh:mm')} - {moment(obj.end_avail).format('DD/MM/YYYY hh:mm')}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Carousel arrows infinite>
                    {sessionsTasks.filter(obj => obj.sessions_id === selected).map(getCards)}
                </Carousel>
                <br/>
                <Typography>Envie de proposer une tâche qui n'existe pas ?</Typography> <Button size="small" onClick={() => history.push('/user/activity/add')}>Cliquez ici !</Button>
            </div>

        );
    }
}

export default About;