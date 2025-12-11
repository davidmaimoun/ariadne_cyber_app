import { Box } from "@mui/material";
import { pastelPalette } from "../theme/pastelPallete"
import type React from "react";

export type BubbleStatus = "success" | "warning" | "error" | "primary";

interface FormBoxProps {
    children: React.ReactNode;
}

interface BubbleBoxProps {
  text: string;
  status?: BubbleStatus;
  isLeft: boolean;
}

export const FormBox: React.FC<FormBoxProps> = ({ children, ...rest }) => {
    return (
        <Box component="form" {...rest}
            sx={{ display: "flex", flexDirection: "column", mt: 1, gap: 2 }}
        >
            {children}
        </Box>
    );
};

export const BubbleBox: React.FC<BubbleBoxProps> = ({ text, status, isLeft }) => {
  const bgColor = status ? pastelPalette[status] : pastelPalette.default;

  return (
    <Box
      sx={{
        backgroundColor: bgColor,
        padding: "12px 16px",
        borderRadius: 3,
        maxWidth: "85%",
        boxShadow: "0px 1px 3px rgba(149, 179, 245, 0.88)",
        lineHeight: 1.4,
        // style bulle WhatsApp
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          ...( isLeft ? {left: 10} : {right: 10}),
          bottom: -8,
          width: 0,
          height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderTop: `10px solid ${bgColor}`,
        },
      }}
    >
      {text}
    </Box>
  );
};
