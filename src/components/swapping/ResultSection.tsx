import React from "react";
import { Paper, Typography } from "@mui/material";

interface ResultSectionProps {
  image: string;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ image }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        width: '100%',
        height: '580px',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: image ? 'transparent' : '#f5f5f5',
        backgroundImage: image ? `url(${image})` : 'none',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {!image && (
        <Typography color="textSecondary" sx={{ px: 4, textAlign: 'center' }}>
          Upload two images and click Generate to see the AI-swapped result
        </Typography>
      )}
    </Paper>
  );
}; 