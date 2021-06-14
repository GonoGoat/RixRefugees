import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import classes from "../../../Style/Indicator";
const useStyles=classes;

function Indicator(props) {
    const styles = useStyles();

    if (props.isSelected) {
        return (
            <FiberManualRecordIcon
                classes={{root : styles.button}}
                fontSize='small'
            />
        )
    }
    return (
        <FiberManualRecordOutlinedIcon
            onClick={props.onClickHandler}
            value={props.index}
            key={props.index}
            tabIndex={0}
            classes={{root : styles.button}}
            fontSize='small'
        />
    )
}

export default Indicator;