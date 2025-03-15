import { Box, Typography, Paper, Grid, Avatar } from "@mui/material";

export const WhoWeArePage = () => {
  const teamMembers = [
    { 
      name: "Alex Johnson", 
      role: "CEO & Founder", 
      bio: "Fashion tech enthusiast with over 10 years of experience in the industry."
    },
    { 
      name: "Sarah Chen", 
      role: "AI Engineer", 
      bio: "Machine learning expert specialized in computer vision and image processing."
    },
    { 
      name: "Michael Rodriguez", 
      role: "UX Designer", 
      bio: "Creating intuitive and engaging experiences that put users first."
    }
  ];

  return (
    <Box sx={{ padding: '40px', maxWidth: '1280px', margin: '0 auto' }}>
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: 'bold', 
          mb: 2,
          textAlign: 'center'
        }}
      >
        Who We Are
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          mb: 5, 
          fontSize: '1.1rem',
          maxWidth: '800px',
          margin: '0 auto 48px',
          textAlign: 'center',
          color: '#555'
        }}
      >
        We're a team of passionate individuals combining fashion expertise with cutting-edge AI technology to revolutionize how people visualize clothing options.
      </Typography>
      
      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper 
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '12px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Avatar 
                sx={{ 
                  width: 100, 
                  height: 100,
                  mb: 2,
                  bgcolor: '#39FF14',
                  color: '#000',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}
              >
                {member.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                {member.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2, color: '#39FF14', fontWeight: 'medium' }}>
                {member.role}
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                {member.bio}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 