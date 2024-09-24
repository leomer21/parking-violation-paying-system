import { FC } from "react";
import { MenuItem, Select, SelectProps } from "@mui/material";

interface ValueType {
  value: string | number;
  name: string | number;
}

interface CustomSelectProps extends Omit<SelectProps, "variant"> {
  variant?: "filled" | "outlined" | "standard";
  items?: ValueType[];
}

const SelectComponent: FC<CustomSelectProps> = ({
  variant = "outlined", // Default value for variant
  items,
  ...props
}) => {
  return (
    <Select {...props} variant={variant} className="w-full">
      {items?.map((item, index) => (
        <MenuItem key={index} value={item.value}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectComponent;
