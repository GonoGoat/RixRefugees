import React from 'react';

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

  const axios = require('axios')

  async function fetchData() {
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_API}/sessions_tasks/${props.id}`)
    .then(res => {
        setDesc(res.data);
        setLoading(false);
    })
    .catch(err => {
        console.log(err);
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