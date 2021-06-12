import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function ConfirmModal(props) {
    function handleSubmit() {
        props.setOpen(false);
        props.handleSubmit();
    }

    return (
        <Dialog
            open={props.open}
            onClose={() => props.setOpen(false)}
        >
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)} color="primary">
                    Retour en arrière
                </Button>
                <Button onClick={() => handleSubmit()} color="primary">
                    Confirmer
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmModal;