import { Box, Typography } from "@mui/material";

export const HeaderText = (props: { page?: string }) => {
  // Extract page from props, default to "home" if not provided
  const { page = "home" } = props;
  
  // Homepage variant
  if (page === "home") {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '24px 24px 0px',
          minHeight: '15vh'
        }}
      >
        <Typography
          variant="h1"
          align="center"
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 800,
            fontSize: { xs: '1.8rem', md: '2.8rem', lg: '3.5rem' },
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            lineHeight: 1.2,
            marginBottom: '10px'
          }}
        >
          START{' '}
          <Box
            component="span"
            sx={{
              color: '#39FF14',
              position: 'relative',
              textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.5)',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-3px',
                left: 0,
                width: '100%',
                height: '3px',
                backgroundColor: '#39FF14',
                borderRadius: '2px',
                boxShadow: '0 0 8px #39FF14, 0 0 12px #39FF14',
              }
            }}
          >
            SWAPPING
          </Box>{' '}
          WITH{' '}
          <Box
            component="span"
            sx={{
              color: '#39FF14',
              textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.5), 0 0 30px rgba(57, 255, 20, 0.3)'
            }}
          >
            AI
          </Box>
        </Typography>
      </Box>
    );
  }
  
  // Swapping page variant
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '8px 12px',
        minHeight: 'auto',
        height: 'auto',
        marginBottom: '16px'
      }}
    >
      <Typography
        variant="h4"
        align="left"
        sx={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 500,
          fontStyle: 'italic',
          fontSize: { xs: '1.2rem', md: '1.6rem', lg: '2rem' },
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          lineHeight: 1,
          color: '#90EE90', // Light green color
        }}
      >
        AI SWAPPING
      </Typography>
    </Box>
  );
};
  