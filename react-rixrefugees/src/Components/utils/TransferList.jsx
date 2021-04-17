import React from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import classes from '../../Style/TransferList';
const useStyles=classes;


function not(a, b) {
  return a.filter((value) => b.findIndex((obj) => obj.id === value.id) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.findIndex((obj) => obj.id === value.id) !== -1);
}

function TransferList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const styles = useStyles();

  const leftChecked = intersection(checked, props.left);
  const rightChecked = intersection(checked, props.right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.findIndex((obj) => obj.id === value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    props.setRight(props.right.concat(leftChecked));
    props.setLeft(not(props.left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    props.setLeft(props.left.concat(rightChecked));
    props.setRight(not(props.right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (items) => (
    <Paper className={styles.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value.id}-label`;

          return (
            <ListItem key={value.id} role="listitem" button onClick={() => props.setSelected(value.id)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.findIndex((obj) => obj.id ===value.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  onChange={handleToggle(value)}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.username}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customList(props.left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={styles.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={styles.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(props.right)}</Grid>
    </Grid>
  );
};

export default TransferList;
