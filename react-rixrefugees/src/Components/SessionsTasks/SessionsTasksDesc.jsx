import React from 'react';
import { useSnackbar } from 'notistack';
import axios from "../../utils/axios";

import { makeStyles } from '@material-ui/core/styles';

import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import LoadingIndicator from "../utils/LoadingIndicator";
import CustomDescriptionIcon from "../utils/Icons/CustomDescriptionIcon"

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function SessionsTasksDesc(props) {
  const [desc,setDesc] = React.useState();
  const [loading,setLoading] = React.useState(false)
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  async function fetchData() {
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_API}/sessions_tasks/desc/${props.id}`)
    .then(res => {
        setDesc(res.data);
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
}

  const handleClick = (event) => {
    fetchData();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} color="primary" onClick={handleClick}>
            <strong>
                <CustomDescriptionIcon/>
                Lire la description
            </strong>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      > 
        {loading || !desc ? <LoadingIndicator/> : <Typography className={classes.typography}>{desc.description}</Typography>}
      </Popover>
    </div>
  );
}

export default SessionsTasksDesc;