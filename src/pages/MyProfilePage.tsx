import { Box, Typography, Avatar, Button, Paper, Grid, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export const MyProfilePage = () => {
  // Mock user data
  const user = {
    name: "Jamie Smith",
    email: "jamie.smith@example.com",
    bio: "Fashion enthusiast and tech lover. Always looking for new ways to express my style.",
    memberSince: "January 2023",
    favorites: 12,
    swaps: 34
  };

  // Mock swap history
  const recentSwaps = [
    { id: 1, date: "July 15, 2023", item: "Summer Dress", status: "Completed" },
    { id: 2, date: "July 10, 2023", item: "Denim Jacket", status: "Completed" },
    { id: 3, date: "July 5, 2023", item: "Casual Shirt", status: "Completed" }
  ];

  return (
    <Box sx={{ padding: '40px', maxWidth: '1280px', margin: '0 auto' }}>
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: 'bold', 
          mb: 4,
          textAlign: 'center'
        }}
      >
        My Profile
      </Typography>
      
      <Grid container spacing={4}>
        {/* Profile Info */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              borderRadius: '12px'
            }}
          >
            <Avatar 
              sx={{ 
                width: 120, 
                height: 120, 
                mb: 2,
                bgcolor: '#39FF14',
                color: '#000',
                fontSize: '2.5rem',
                fontWeight: 'bold'
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              {user.name}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {user.email}
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
              {user.bio}
            </Typography>
            
            <Button 
              variant="outlined" 
              sx={{ 
                mb: 1,
                color: '#39FF14',
                borderColor: '#39FF14',
                '&:hover': {
                  borderColor: '#2bcc0f',
                  backgroundColor: 'rgba(57, 255, 20, 0.04)'
                }
              }}
            >
              Edit Profile
            </Button>
            
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
              Member since {user.memberSince}
            </Typography>
          </Paper>
          
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              mt: 3,
              borderRadius: '12px'
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Statistics
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#39FF14', fontWeight: 'bold' }}>
                    {user.favorites}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Favorites
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#39FF14', fontWeight: 'bold' }}>
                    {user.swaps}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Swaps
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3,
              borderRadius: '12px'
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
              Recent Swaps
            </Typography>
            
            <List sx={{ width: '100%' }}>
              {recentSwaps.map((swap, index) => (
                <Box key={swap.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar 
                        variant="rounded" 
                        sx={{ 
                          bgcolor: 'rgba(57, 255, 20, 0.1)',
                          color: '#39FF14'
                        }}
                      >
                        {swap.item.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={swap.item}
                      secondary={
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {swap.date} • {swap.status}
                        </Typography>
                      }
                    />
                    <Button 
                      size="small" 
                      variant="text"
                      sx={{ 
                        color: '#39FF14',
                        '&:hover': { 
                          backgroundColor: 'rgba(57, 255, 20, 0.04)'
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </ListItem>
                  {index < recentSwaps.length - 1 && <Divider variant="inset" component="li" />}
                </Box>
              ))}
            </List>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button 
                variant="outlined"
                sx={{ 
                  color: '#39FF14',
                  borderColor: '#39FF14',
                  '&:hover': {
                    borderColor: '#2bcc0f',
                    backgroundColor: 'rgba(57, 255, 20, 0.04)'
                  }
                }}
              >
                View All Swaps
              </Button>
            </Box>
          </Paper>
          
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              mt: 3,
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(57, 255, 20, 0.03)'
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
              Ready for a new swap?
            </Typography>
            
            <Button 
              variant="contained"
              sx={{
                bgcolor: '#39FF14',
                color: '#000',
                fontWeight: 'bold',
                padding: '10px 24px',
                borderRadius: '8px',
                textTransform: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 8px rgba(57, 255, 20, 0.3)',
                '&:hover': {
                  bgcolor: '#2bcc0f',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 12px rgba(57, 255, 20, 0.5)',
                }
              }}
            >
              Start New Swap
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}; 