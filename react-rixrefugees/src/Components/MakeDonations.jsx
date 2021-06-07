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

function MakeDonations () {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes = useStyles();
    const [donation,setDonation] = React.useState({
      lname : '',
      fname : '',
      description : '',
      contact : '',
    });

    const handleInputChange = (e) => {
      const {name, value } = e.target;
      setDonation({
      ...donation,
      [name]: value
      });
    };

    async function handleSubmit() {
        let values = check.checkForm([
          check.lname(donation.lname),
          check.fname(donation.fname),
          check.description(donation.description)
        ])
        if (values === true) {
          await axios.post(`${process.env.REACT_APP_API}/donations/add`, donation)
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
                    value={donation.lname}
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
                    value={donation.fname}
                    onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Que pourriez-vous nous donner ?"
                  name="description"
                  size="small"
                  variant="outlined"
                  multiline
                  rows={5}
                  value={donation.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Comment pouvons-nous vous contacter ?"
                  name="contact"
                  size="small"
                  variant="outlined"
                  multiline
                  rows={5}
                  value={donation.contact}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" fullWidth onClick={handleSubmit} variant="contained">
              Faire un don
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default MakeDonations;