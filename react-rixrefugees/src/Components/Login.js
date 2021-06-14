import React from 'react';
import {useDispatch} from "react-redux";
import {switchUser} from "../redux/Actions/index";
import { useSnackbar } from 'notistack';
import {Link} from "react-router-dom";
// MUI Core
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography"
import { makeStyles } from '@material-ui/core/styles';

import check from "../utils/FormValidations/validators";
import axios from "../utils/axios";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

function Login () {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [login,setLogin] = React.useState({
    mail : '',
    password : '',
  });

  const handleInputChange = (e) => {
      const {name, value } = e.target;
      setLogin({
      ...login,
      [name]: value
      });
  };

  async function handleSubmit() {
    let values = check.checkForm([
      check.mail(login.mail),
      check.password(login.password)
    ])
    if (values === true) {
      await axios.post(`${process.env.REACT_APP_API}/users/login`, login)
      .then(res => {
        dispatch(switchUser({user : (res.data ? 2 : 1)}))
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

  return (
    <Container className={classes.container} maxWidth="xs">
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="mail"
                  size="small"
                  variant="outlined"
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
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" fullWidth onClick={handleSubmit}  variant="contained">
              Se connecter
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Mot de passe oublié ? <Link to={'/reset'}>Cliquez ici !</Link> 
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;