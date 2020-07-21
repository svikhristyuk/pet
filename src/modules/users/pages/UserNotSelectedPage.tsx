import React from "react";
import { Box, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

export function UserNotSelectedPage() {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box fontSize="120px">
        <AccountCircle fontSize="inherit" color="action" />
      </Box>

      <Typography variant="h6" color="textSecondary">
        Select user to see details
      </Typography>
    </Box>
  );
}
