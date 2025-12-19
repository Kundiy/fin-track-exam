import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type ConfirmationDialogProps = {
    open: boolean
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    onConfirm: () => void,
    title: string
    description: string
    confirmText: string
}

export default function ConfirmationDialog({
                                               open,
                                               onClose,
                                               onConfirm,
                                               title,
                                               description,
                                               confirmText
                                           }: ConfirmationDialogProps) {

    const handleClose = () => {
        onClose(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{textTransform: 'none'}}>
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onConfirm} autoFocus>
                        {confirmText}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
