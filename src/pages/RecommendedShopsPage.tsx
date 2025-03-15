import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper, Button, Chip, Container, Card, CardMedia, CardContent, Fade, useMediaQuery, Divider } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

// Sample clothing items data
const SIMILAR_CLOTHES = [
  {
    id: 1,
    name: "Classic White Shirt",
    price: "$49.99",
    shop: "Fashion Forward",
    shopUrl: "https://example.com/shop1",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    tags: ["Shirts", "Classic", "Formal"]
  },
  {
    id: 2,
    name: "Slim Fit Blue Jeans",
    price: "$59.99",
    shop: "Urban Styles",
    shopUrl: "https://example.com/shop2",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    tags: ["Jeans", "Casual", "Everyday"]
  },
  {
    id: 3,
    name: "Summer Floral Dress",
    price: "$79.99",
    shop: "Boutique Elegance",
    shopUrl: "https://example.com/shop3",
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    tags: ["Dress", "Summer", "Floral"]
  },
  {
    id: 4,
    name: "Casual Cotton Sweater",
    price: "$45.99",
    shop: "Eco Wardrobe",
    shopUrl: "https://example.com/shop4",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    tags: ["Sustainable", "Sweater", "Casual"]
  },
  {
    id: 5,
    name: "Retro Denim Jacket",
    price: "$89.99",
    shop: "Vintage Treasures",
    shopUrl: "https://example.com/shop5",
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    tags: ["Jacket", "Retro", "Denim"]
  },
  {
    id: 6,
    name: "Black Leather Boots",
    price: "$129.99",
    shop: "Urban Styles",
    shopUrl: "https://example.com/shop2",
    image: "https://images.unsplash.com/photo-1608256246200-55f0b8109cce?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    tags: ["Shoes", "Leather", "Winter"]
  }
];

export const RecommendedShopsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State for hover effects
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  // Get the liked image from location state or use a default
  const likedImage = location.state?.likedImage || "";
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate("/swapping");
  };

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, pb: 5 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleBackClick}
          sx={{ 
            mr: 2,
            backgroundColor: '#39FF14',
            color: '#333',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
          }}
        >
          Back to Try-On
        </Button>
      </Box>

      {/* Top section with liked image */}
      <Box sx={{ mb: 5 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 3, 
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <FavoriteIcon sx={{ color: '#E91E63' }} /> Your Liked Style
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                height: { xs: '300px', md: '400px' },
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundImage: likedImage ? `url(${likedImage})` : 'linear-gradient(45deg, #f3f3f3 25%, #e6e6e6 25%, #e6e6e6 50%, #f3f3f3 50%, #f3f3f3 75%, #e6e6e6 75%, #e6e6e6 100%)',
                backgroundSize: likedImage ? 'contain' : '40px 40px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {!likedImage && (
                <Typography color="textSecondary">
                  Liked image will appear here
                </Typography>
              )}
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                We found similar styles for you!
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Based on your liked style, we've found similar clothing items from top shops.
                Hover over each item to see details and shop links.
              </Typography>
              
              <Box sx={{ 
                p: 2, 
                bgcolor: 'rgba(57, 255, 20, 0.1)', 
                borderRadius: 2,
                border: '1px dashed #39FF14'
              }}>
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  Tip: Click on any item below to visit the shop where you can purchase it.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <Divider sx={{ mb: 4 }} />

      {/* Similar clothes section */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Similar Clothes You'll Love
      </Typography>

      <Grid container spacing={3}>
        {SIMILAR_CLOTHES.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              elevation={hoveredItem === item.id ? 4 : 1}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              sx={{
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                transform: hoveredItem === item.id ? 'translateY(-8px)' : 'none',
                height: '100%',
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={() => window.open(item.shopUrl, '_blank')}
            >
              <CardMedia
                component="img"
                height="220"
                image={item.image}
                alt={item.name}
              />
              
              <CardContent sx={{ pb: isMobile ? 1 : 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  {item.name}
                </Typography>
                
                <Typography variant="subtitle1" sx={{ mb: 1, color: '#E91E63', fontWeight: 'bold' }}>
                  {item.price}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    from <b>{item.shop}</b>
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 0.5, mt: 1, flexWrap: 'wrap' }}>
                  {item.tags.map((tag, index) => (
                    <Chip 
                      key={index} 
                      label={tag} 
                      size="small" 
                      sx={{ 
                        backgroundColor: 'rgba(57, 255, 20, 0.1)',
                        color: '#090',
                        fontWeight: 'medium',
                        fontSize: '0.7rem',
                        height: '22px'
                      }} 
                    />
                  ))}
                </Box>
              </CardContent>
              
              {/* Hover overlay - only shown on non-mobile devices */}
              {!isMobile && (
                <Fade in={hoveredItem === item.id}>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      py: 1.5,
                      px: 2,
                      color: 'white',
                      gap: 1
                    }}
                  >
                    <ShoppingBagIcon fontSize="small" />
                    <Typography variant="button">Shop Now</Typography>
                    <OpenInNewIcon fontSize="small" />
                  </Box>
                </Fade>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 