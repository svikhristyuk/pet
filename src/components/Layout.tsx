import React, { ReactNode } from "react";
import { Box, CssBaseline } from "@material-ui/core";

interface LayoutProps {
  list: ReactNode;
  details: ReactNode;
}

export function Layout({ list, details }: LayoutProps) {
  return (
    <Box height="100vh" display="flex">
      <CssBaseline />

      <Box bgcolor="#fff" height="100%">
        {list}
      </Box>

      <Box flexGrow="1" height="100%">
        {details}
      </Box>
    </Box>
  );
}
