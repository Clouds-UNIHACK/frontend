import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper, Button, Chip, Container, Card, CardMedia, CardContent, Fade, useMediaQuery, Divider, Alert } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

// Define the recommended shop props
export interface RecommendedShopProps {
  image_url: string | null;
  link: string | null;
  shop: string | null;
  title: string | null;
  price: number | null;
}

// Sample data to use as fallback when API data is missing
const SAMPLE_RECOMMENDATIONS: RecommendedShopProps[] = [
  {
    image_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    link: "https://example.com/shop1",
    shop: "Fashion Forward",
    title: "Classic White Shirt",
    price: 49.99
  },
  {
    image_url: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    link: "https://example.com/shop2",
    shop: "Urban Styles",
    title: "Slim Fit Blue Jeans",
    price: 59.99
  },
  {
    image_url: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    link: "https://example.com/shop3",
    shop: "Boutique Elegance",
    title: "Summer Floral Dress",
    price: 79.99
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
  
  // State for recommendations and errors
  const [recommendations, setRecommendations] = useState<RecommendedShopProps[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  useEffect(() => {
    try {
      // Try to get recommendations from state, fall back to sample data if needed
      let recs = [];
      
      // Log the incoming data for debugging
      console.log("Location state:", location.state);
      
      if (location.state?.recommendations?.shop_recommendations) {
        console.log("Using shop_recommendations from API");
        recs = location.state.recommendations.shop_recommendations;
      } else if (Array.isArray(location.state?.recommendations)) {
        console.log("Using recommendations array directly");
        recs = location.state.recommendations;
      } else {
        console.log("Using sample recommendations - no valid data from API");
        recs = SAMPLE_RECOMMENDATIONS;
      }
      
      // Additional safety - ensure all items have the expected shape
      recs = recs.map((item: any) => ({
        image_url: item.image_url || null,
        link: item.link || null,
        shop: item.shop || null,
        title: item.title || null,
        price: item.price || null
      }));
      
      console.log("Processed recommendations:", recs);
      setRecommendations(recs);
      
      // Reset any previous errors
      setHasError(false);
      setErrorMessage("");
    } catch (error) {
      console.error("Error processing recommendations:", error);
      setHasError(true);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error processing recommendations");
      setRecommendations(SAMPLE_RECOMMENDATIONS);
    }
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [location.state]);

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

      {/* Error message if applicable */}
      {hasError && (
        <Alert 
          severity="warning" 
          sx={{ mb: 3 }}
          onClose={() => setHasError(false)}
        >
          {errorMessage || "There was an error loading recommendations. Showing sample items instead."}
        </Alert>
      )}

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

      {/* Recommendations section */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Similar Clothes You'll Love
      </Typography>

      <Grid container spacing={3}>
        {recommendations.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={hoveredItem === index ? 4 : 1}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              sx={{
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                transform: hoveredItem === index ? 'translateY(-8px)' : 'none',
                height: '100%',
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={() => item.link && window.open(item.link, '_blank')}
            >
              <CardMedia
                component="img"
                height="220"
                image={item.image_url || "https://via.placeholder.com/400x300?text=No+Image"}
                alt={item.title || "Product"}
              />
              
              <CardContent sx={{ pb: isMobile ? 1 : 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  {item.title || "Unknown Product"}
                </Typography>
                
                <Typography variant="subtitle1" sx={{ mb: 1, color: '#E91E63', fontWeight: 'bold' }}>
                  {(() => {
                    // Handle different price formats safely
                    if (item.price === null || item.price === undefined) {
                      return "Price unavailable";
                    }
                    
                    // If price is already a number
                    if (typeof item.price === 'number') {
                      return `$${item.price.toFixed(2)}`;
                    }
                    
                    // If price is a string that can be converted to a number
                    const numPrice = Number(item.price);
                    if (!isNaN(numPrice)) {
                      return `$${numPrice.toFixed(2)}`;
                    }
                    
                    // If it's a string but not convertible to number, just return it as is
                    return typeof item.price === 'string' ? item.price : "Price unavailable";
                  })()}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    from <b>{item.shop || "Unknown Shop"}</b>
                  </Typography>
                </Box>
              </CardContent>
              
              {/* Hover overlay - only shown on non-mobile devices */}
              {!isMobile && (
                <Fade in={hoveredItem === index}>
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