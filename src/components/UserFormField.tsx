import { Box, TextField } from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";
import React from "react";

interface UserFormField {
  icon?: SvgIconComponent;
  label: String;
}

export function UserFormField({ icon: Icon, label }: UserFormField) {
  return (
    <Box display="flex" alignItems="flex-end" mb={2}>
      <Box width="40px" textAlign="center" mr={2}>
        {Icon && <Icon color="action" />}
      </Box>

      <TextField label={label} fullWidth />
    </Box>
  );
}
