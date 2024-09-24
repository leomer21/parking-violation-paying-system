import { FC } from "react";
import { Box, TextField, TextFieldProps } from "@mui/material";

interface StateTextFieldsProps extends Omit<TextFieldProps, "variant"> {
  variant?: "filled" | "outlined" | "standard";
}

const StateTextFields: FC<StateTextFieldsProps> = ({
  variant = "outlined", // Default value for variant
  ...props
}) => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 0 },
        "& input": { borderColor: "#ff551d" }, // Set initial border color
      }}
      style={{
        borderColor: "#FA551D",
        color: "#091C62",
        backgroundColor: "#FFF5F3",
      }}
      noValidate
      autoComplete="on"
    >
      <TextField
        className="w-full"
        id="outlined-controlled"
        variant={variant} // Apply the variant prop
        {...props} // Spread the rest of the props
      />
    </Box>
  );
};

export default StateTextFields;
