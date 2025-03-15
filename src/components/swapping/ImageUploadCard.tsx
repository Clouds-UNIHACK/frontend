import React from "react";
import { Paper, Typography, Stack, Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface ImageUploadCardProps {
    index: number;
    image: string;
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    onCameraOpen: (index: number) => void;
}

export const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
    index,
    image,
    onFileUpload,
    onCameraOpen
}) => {
    const promptText = index === 0 ? "Upload Base Image" : "Upload Item Image";

    return (
        <Paper
            elevation={3}
            sx={{
                height: 'calc((100% - 24px) / 2)',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: image ? 'transparent' : '#f5f5f5',
                position: 'relative',
                backgroundImage: image ? `url(${image})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {!image && (
                <Typography color="textSecondary" sx={{ mb: 2 }}>
                    {promptText}
                </Typography>
            )}
            <ImageUploadControls
                index={index}
                image={image}
                onFileUpload={onFileUpload}
                onCameraOpen={onCameraOpen}
            />
        </Paper>
    );
};

const ImageUploadControls = ({ index, image, onFileUpload, onCameraOpen }: ImageUploadCardProps) => {
    return <Stack
        direction="row"
        spacing={2}
        sx={{
            position: image ? 'absolute' : 'relative',
            bottom: image ? '16px' : 'auto',
            backgroundColor: image ? 'rgba(0,0,0,0.6)' : 'transparent',
            padding: image ? '8px 16px' : '0',
            borderRadius: '24px'
        }}
    >
        <Button
            variant="contained"
            component="label"
            sx={{
                bgcolor: '#90EE90',
                color: '#000',
                '&:hover': { bgcolor: '#7CCD7C' },
            }}
        >
            <CloudUploadIcon sx={{ mr: 1 }} />
            Upload
            <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => onFileUpload(e, index)}
            />
        </Button>
        <Button
            variant="contained"
            onClick={() => onCameraOpen(index)}
            sx={{
                bgcolor: '#90EE90',
                color: '#000',
                '&:hover': { bgcolor: '#7CCD7C' },
            }}
        >
            <CameraAltIcon sx={{ mr: 1 }} />
            Camera
        </Button>
    </Stack>
}
