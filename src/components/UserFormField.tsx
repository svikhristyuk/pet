import React from "react";
import { useFormikContext, useField } from "formik";
import { Box, TextField, StandardTextFieldProps } from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";

interface UserFormField extends StandardTextFieldProps {
  icon?: SvgIconComponent;
  label: string;
  name: string;
}

export function UserFormField({ icon: Icon, label, name }: UserFormField) {
  const { isSubmitting } = useFormikContext();
  const [textFieldProps] = useField({ name });
  // If value `undefined` by default, React will throw an error saying
  // that you have changed an input from uncontrolled to controlled.
  const { value = "", ...restTextFieldProps } = textFieldProps;

  return (
    <Box display="flex" alignItems="flex-end" mb={2}>
      <Box width="40px" textAlign="center" mr={2}>
        {Icon && <Icon color="action" />}
      </Box>

      <TextField
        fullWidth
        label={label}
        value={value}
        disabled={isSubmitting}
        {...restTextFieldProps}
      />
    </Box>
  );
}
