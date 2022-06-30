import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Grow from "@mui/material/Grow";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

export default function ConfirmDialog(props) {
  const { confirmDialog } = props;

  return (
    <div>
      <Dialog
        open={confirmDialog.isOpen}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-description">
          {confirmDialog.title}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={confirmDialog.onConfirm}
            variant="contained"
            color="success"
            size="small"
          >
            Yes
          </Button>
          <Button
            onClick={confirmDialog.onFail}
            variant="contained"
            size="small"
            color="info"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
