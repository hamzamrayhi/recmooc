import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddReviewConfirmation = ({ open, onClose, onConfirm }) => {
    const handleConfirm = () => {
        onConfirm(); // Call the onConfirm function to add the review
        onClose(); // Close the dialog
        setTimeout(() => {
            window.location.reload(); // Reload the page after confirmation
        }, 2000); // 2000 milliseconds = 2 seconds delay (adjust as needed)
    };
    
    const handleClose = () => {
        onClose(); // Close the dialog without adding the review
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Review Confirmation"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Confirm the submission of your review
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button> {/* Close dialog */}
                <Button onClick={handleConfirm} autoFocus> {/* Call onConfirm and close dialog */}
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddReviewConfirmation;
