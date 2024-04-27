import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
    const styleForPaper = {
      width: "40px",
      height: "40px",
    };
  return (
    <div className="spinparent">
      <Box sx={{ width: "50%" }}>
        <LinearProgress />
      </Box>
    </div>
  );
}
