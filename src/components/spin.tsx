import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <div className="spinparent">
      <Box sx={{ width: "50%" }}>
        <LinearProgress />
      </Box>
    </div>
  );
}
