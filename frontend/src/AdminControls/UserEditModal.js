import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import UserEdit from "./UserEdit";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  height: "fit-content",
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: "white 0 0 5px 0.5px",
  p: 4,
  borderRadius: "5px",
  maxHeight: "80vh",
  overflow: "auto",
};

export default function TransitionsModal({
  isEditOpen,
  setIsEditOpen,
  modalData,
}) {
  const handleClose = () => setIsEditOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isEditOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isEditOpen}>
          <Box sx={style}>
            <UserEdit modalData={modalData} setIsEditOpen={setIsEditOpen} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
