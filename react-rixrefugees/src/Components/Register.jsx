import React from 'react';
import { useSnackbar } from 'notistack';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import check from "../utils/FormValidations/validators"
import axios from "../utils/axios";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

function Register () {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes = useStyles();
    const [register,setRegister] = React.useState({
      mail : '',
      password : '',
      confirm : '',
      lname : '',
      fname : '',
      motivation : '',
      contact : '',
    });

    const handleInputChange = (e) => {
      const {name, value } = e.target;
      setRegister({
      ...register,
      [name]: value
      });
    };

    async function handleSubmit() {
      if (register.password !== register.confirm) {
        enqueueSnackbar('Veillez à bien rentrer 2 mots de passe similaires.', {variant : "error"});
      }
      else {
        let values = check.checkForm([
          check.mail(register.mail),
          check.password(register.password),
          check.lname(register.lname),
          check.fname(register.fname),
          check.motivation(register.motivation)
        ])
        if (values === true) {
          await axios.post(`${process.env.REACT_APP_API}/users/add`, register)
          .then(res => {
            localStorage.setItem("rixrefugees-message",res.data);
            window.location.href = "/";
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
        }
        else {
          closeSnackbar();
          values.filter(val => val !== true).forEach(obj => {
            enqueueSnackbar(obj, {variant : "error"});
          })
        }
      }
    }

  return (
    <Container className={classes.container} maxWidth="xs">
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Nom"
                    name="lname" 
                    size="small" 
                    variant="outlined"
                    value={register.lname}
                    onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Prénom"
                    name="fname" 
                    size="small" 
                    variant="outlined"
                    value={register.fname}
                    onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Adresse email"
                    name="mail" 
                    size="small" 
                    variant="outlined"
                    value={register.email}
                    onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mot de passe"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                  value={register.password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirmer le mot de passe"
                  name="confirm"
                  size="small"
                  type="password"
                  variant="outlined"
                  value={register.confirm}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Quelles sont vos motivations à rejoindre l'équipe RixRefugees ?"
                  name="motivation"
                  size="small"
                  variant="outlined"
                  multiline
                  rows={5}
                  value={register.motivation}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Informations de contact"
                  name="contact"
                  size="small"
                  variant="outlined"
                  multiline
                  rows={5}
                  value={register.contact}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" fullWidth onClick={handleSubmit} variant="contained">
              S'inscrire
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Register;