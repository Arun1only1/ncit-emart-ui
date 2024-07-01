import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../lib/axios.instance";
import { useNavigate, useParams } from "react-router-dom";

const DeleteProductDialog = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   delete product
  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: async () => {
      return await axiosInstance.delete(`/product/delete/${params.id}`);
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        color="error"
        fullWidth
      >
        Delete Product
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this product?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This process is irreversible. Product once deleted cannot be
            restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="success">
            Cancel
          </Button>
          <Button
            onClick={() => {
              mutate();
              handleClose();
            }}
            autoFocus
            color="error"
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteProductDialog;
