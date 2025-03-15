import React from "react";
import { Button } from "@mui/material";

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, disabled }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        py: 1.5,
        px: 4,
        fontSize: '1.1rem',
        fontWeight: 'bold',
        borderRadius: '24px',
        background: 'linear-gradient(90deg, #9C27B0 0%, #E91E63 100%)',
        boxShadow: '0 0 15px rgba(156, 39, 176, 0.5), 0 0 25px rgba(233, 30, 99, 0.3)',
        color: 'white',
        textTransform: 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: 'linear-gradient(90deg, #8E24AA 0%, #D81B60 100%)',
          transform: 'translateY(-3px)',
          boxShadow: '0 0 20px rgba(156, 39, 176, 0.6), 0 0 30px rgba(233, 30, 99, 0.4)',
        },
        '&:disabled': {
          background: 'linear-gradient(90deg, #9E9E9E 0%, #757575 100%)',
          boxShadow: 'none',
        }
      }}
    >
      Generate Swap
    </Button>
  );
}; 