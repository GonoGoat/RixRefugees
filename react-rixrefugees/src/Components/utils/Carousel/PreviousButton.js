import IconButton from "@material-ui/core/IconButton"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import classes from "../../../Style/Arrows";
const useStyles=classes;

function PreviousButton(props) {
    const styles = useStyles();

    return (
        <IconButton
            onClick={props.onClickHandler}
            classes={{root : styles.prev}}
        >
            <ArrowBackIosIcon fontSize='large'/>
        </IconButton>
    )
}

export default PreviousButton;