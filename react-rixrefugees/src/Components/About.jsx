import React from "react";

import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import LoadingIndicator from "../utils/LoadingIndicator";
import Typography from "@material-ui/core/Typography";

function About() {
    const [loading,setLoading] = React.useState(true);
    const [sessionsTasks,setSessionsTasks] = React.useState([]);
    const [sessions,setSessions] = React.useState([]);
    const [selected, setSelected] = React.useState();

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

    function cardRender(value,index) {

    }

    function titleRender(value,index) {

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
                            value={props.value.sessions_id}
                            onChange={handleInputChange}
                            name="sessions_id"
                        >
                            {sessions.map((obj) => {
                                return <MenuItem value={obj.id}>{obj.username} à {obj.name} : {moment(obj.start_avail).format('DD/MM/YYYY hh:mm')} - {moment(obj.end_avail).format('DD/MM/YYYY hh:mm')}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Carousel arrows infinite>
                    <div>
                        
                        <p className="legend">Legend 1</p>
                    </div>
                    <div>
                        
                        <p className="legend">Legend 2</p>
                    </div>
                    <div>
                        
                        <p className="legend">Legend 3</p>
                    </div>
                </Carousel>
            </div>

        );
    }
}

export default About;