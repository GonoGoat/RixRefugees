import IconButton from "@material-ui/core/IconButton"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import classes from "../../../Style/Arrows";
const useStyles=classes;

function NextButton(props) {
    const styles = useStyles();

    return (
        <IconButton
            onClick={props.onClickHandler}
            classes={{root : styles.next}}
        >
            <ArrowForwardIosIcon fontSize='large'/>
        </IconButton>

    )
}

export default NextButton;