import React from 'react';
import { useSnackbar } from 'notistack';
// MUI Core
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import check from "../utils/FormValidations/validators";
import axios from "../utils/axios";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

function PasswordReset () {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const [mail,setMail] = React.useState('')

  const handleInputChange = (e) => {
      setMail(e.target.value);
  };

  async function handleSubmit() {
    let values = check.checkForm([
      check.mail(mail),
    ])
    if (values === true) {;
      await axios.post(`${process.env.REACT_APP_API}/users/password/reset`, {mail : mail})
      .then(res => {
        enqueueSnackbar(res.data, {variant : "success"});
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
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" fullWidth onClick={handleSubmit}  variant="contained">
              Réinitialiser mon mot de passe
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PasswordReset;