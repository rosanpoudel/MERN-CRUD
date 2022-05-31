import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ snackbarData }) {
  return (
    <>
      {snackbarData?.type === "success" && (
        <Snackbar open={snackbarData?.isOpen}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {snackbarData?.message}
          </Alert>
        </Snackbar>
      )}

      {snackbarData?.type === "error" && (
        <Snackbar open={snackbarData?.isOpen}>
          <Alert severity="error" sx={{ width: "100%" }}>
            {snackbarData?.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
