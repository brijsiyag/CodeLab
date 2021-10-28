import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
const FileNameInput = ({
  fileName,
  setFileName,
  dialogOpen,
  setDialogOpen,
  downloadCode,
}) => {
  const handleClose = () => {
    setDialogOpen(false);
  };
  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Code Download</DialogTitle>
        <DialogContent>
          <DialogContentText minWidth="400px">
            Please Enter File Name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="File Name"
            type="email"
            fullWidth
            variant="standard"
            value={fileName}
            onChange={(e) => {
              setFileName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={downloadCode}>Download</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FileNameInput;
