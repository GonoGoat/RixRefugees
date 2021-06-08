import React from "react";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useSnackbar } from 'notistack';
import LoadingIndicator from "../utils/LoadingIndicator";

import axios from "../../utils/axios";
import check from "../../utils/FormValidations/validators";

function EditUser() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [loading,setLoading] = React.useState(true);
    const [user,setUser] = React.useState();
    const [password,setPassword] = React.useState('');

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/users/edit`)
        .then(res => {
            setUser(res.data);
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
    },[])

    const handleInputChange = (e) => {
        const {name, value } = e.target;
        setUser({
        ...user,
        [name]: value
        });
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };

    async function handleSubmit() {
        let values = check.checkForm([
            check.lname(user.lname),
            check.fname(user.fname),
            check.password(password)
        ])
        if (values === true) {
        await axios.put(`${process.env.REACT_APP_API}/users/update`,{user : user, password : password} )
        .then(res => {
            localStorage.setItem("rixrefugees-message",res.data);
            window.location.href = '/user/profile'
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


    if (loading && !user) return <LoadingIndicator/>
    return (
        <Container maxWidth="xs">
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
                        value={user.lname}
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
                        value={user.fname}
                        onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Informations de contact"
                      name="contact"
                      size="small"
                      type="password"
                      variant="outlined"
                      multiline
                      rows={5}
                      value={user.contact}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Entrer votre mot de passe pour modifier vos données"
                        name="password"
                        size="small"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={handlePasswordChange}
                    />
              </Grid>
              <Grid item xs={12}>
                <Button color="secondary" fullWidth onClick={handleSubmit} variant="contained">
                  Modifier vos données personnelles
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      );
}

export default EditUser;