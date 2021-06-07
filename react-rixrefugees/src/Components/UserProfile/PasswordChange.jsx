import React from 'react';
import { useSnackbar } from 'notistack';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import check from "../../utils/FormValidations/validators"
import axios from "../../utils/axios";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

function PasswordChange () {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes = useStyles();
    const [password,setPassword] = React.useState({
        old : '',
        new : '',
        confirm : ''
    });

    const handleInputChange = (e) => {
      const {name, value } = e.target;
      setPassword({
      ...password,
      [name]: value
      });
    };

    async function handleSubmit() {
      if (password.confirm !== password.new) {
        enqueueSnackbar('Veillez à bien rentrer 2 mots de passe similaires.', {variant : "error"});
      }
      else {
        let values = check.checkForm([
          check.password(password.new),
          check.password(password.old),
        ])
        if (values === true) {
          await axios.put(`${process.env.REACT_APP_API}/users/password/change`, {old : password.old, new : password.new})
          .then(res => {
            localStorage.setItem("rixrefugees-message",res.data);
            window.location.href = "/user/profile";
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
            <TextField
                fullWidth
                label="Ancien mot de passe"
                name="old"
                size="small"
                type="password"
                variant="outlined"
                value={password.old}
                onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nouveau mot de passe"
                  name="new"
                  size="small"
                  type="password"
                  variant="outlined"
                  value={password.new}
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
                  value={password.confirm}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" fullWidth onClick={handleSubmit} variant="contained">
              Changer de mot de passe
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PasswordChange;