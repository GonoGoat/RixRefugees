import React from "react";
import {Link} from "react-router-dom"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Indicator from "./utils/Carousel/Indicator";

import about from '../img/about.jpg';
import donation from "../img/donation.jpg";
import logo from "../img/logo.png";

import classes from "../Style/Accueil";
const useStyles=classes;

function Accueil() {

    const styles = useStyles();

    return (
        <Container>
            <Carousel
                autoPlay={true}
                showThumbs={false}
                showArrows={false}
                infiniteLoop
                showStatus={false}
                className={styles.root}
                interval={5000}
                renderIndicator={(onClickHandler, isSelected, index, label) => <Indicator onClickHandler={onClickHandler} isSelected={isSelected} index={index}/>}
            >
                <Grid classes={{root : styles.container}} container>
                    <Grid item xs={12}>
                        <img className={styles.img} src={logo}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper classes={{root : styles.paper}}>
                            <Typography variant='h4'>Bienvenue chez RixRefugees !</Typography>
                            <Typography>
                                L'association RixRefugees s'occupe de l'accueil de personnes migrantes dans la province de Rixensart en Belgique. Nous les hébergons et les accompagnons dans leurs démarches tout en leur poposant une série d'activité (sport, cours, ...) afin de les permettre de s'intégrer socialement.<br/><br/>
                                <Link to={'/join'}>Cliquez ici</Link> pour en apprendre plus sur l'association !
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <img className={styles.img} src={donation}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper classes={{root : styles.paper}}>
                            <Typography variant='h4'>Voulez-vous faire un don à l'association ?</Typography>
                            <Typography>
                                Vous n'êtes pas membre de l'association mais vous souhaiteriez nous aider en faisant un don ?<br/><br/>
                                <Link to={'/donations'}>Cliquez ici</Link>, remplissez le formulaire et envoyez-le nous ! Nous vous recontacterons pour organiser la récupération de votre donation.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid classes={{root : styles.container}} container>
                    <Grid item xs={12}>
                        <img className={styles.img} src={about}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper classes={{root : styles.paper}}>
                            <Typography variant='h4'>Proposer mon aide comme bénévole ?</Typography>
                            <Typography>
                                Vous êtes membres de l'association et vous souhaitez proposer votre aide pour une des tâches de l'association ?<br/><br/>
                                <Link to={'/about'}>Cliquez ici</Link> pour découvrir les tâches auxquelles vous pouvez participer !
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Carousel>
        </Container>
    )
}

export default Accueil;