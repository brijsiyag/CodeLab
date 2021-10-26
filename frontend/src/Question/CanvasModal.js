import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Canvas from "./Canvas";
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
};

export default function TransitionsModal({ isCanvas, setIsCanvas }) {
  const handleClose = () => setIsCanvas(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isCanvas}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isCanvas}>
          <Box sx={style}>
            <Canvas />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
