import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export const BodyContent = () => {
    return (
      <Box sx={{ padding: { xs: '24px', md: '40px' }, maxWidth: '1280px', margin: '0 auto' }}>
        <Grid container spacing={4}>
          {/* Left Side - 1/3 width */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 4 }}>
              {/* SWAPP Logo */}
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 800,
                  color: '#39FF14',
                  fontSize: { xs: '3rem', md: '4rem' },
                  textShadow: '0 0 10px rgba(57, 255, 20, 0.5)',
                  letterSpacing: '0.05em'
                }}
              >
                SWAPP
              </Typography>
  
              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  color: '#333',
                  maxWidth: '90%',
                  lineHeight: 1.6
                }}
              >
                Transform your wardrobe instantly with our AI-powered swapping technology.
                Experience the future of fashion where you can visualize new styles
                before making a purchase.
              </Typography>
  
              {/* Try it now Button */}
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: '#39FF14',
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textTransform: 'none',
                  alignSelf: 'flex-start',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 8px rgba(57, 255, 20, 0.3)',
                  '&:hover': {
                    bgcolor: '#2bcc0f',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 12px rgba(57, 255, 20, 0.5)',
                  },
                  '&:active': {
                    transform: 'translateY(1px)',
                    boxShadow: '0 2px 4px rgba(57, 255, 20, 0.3)',
                  }
                }}
                onClick={() => window.location.href = '/swapping'}
              >
                Try it now
              </Button>
            </Box>
          </Grid>
  
          {/* Right Side - 2/3 width */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {/* Three sample picture boxes */}
              {[1, 2, 3].map((item) => (
                <Grid item xs={12} sm={4} key={item}>
                  <Paper
                    elevation={3}
                    sx={{
                      height: '280px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: '#f5f5f5',
                      '&:hover': {
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                        transform: 'translateY(-5px)',
                        transition: 'all 0.3s ease'
                      }
                    }}
                  >
                    <Typography color="textSecondary">
                      Sample Image {item}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };
  