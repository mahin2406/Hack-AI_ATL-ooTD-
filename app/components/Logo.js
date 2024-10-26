import { Box, Typography } from "@mui/material";

const Logo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography
        variant="h5"
        sx={{
          color: "#9c27b0",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: '700',
          letterSpacing: '0.1rem',
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          position: 'relative',
          mr: 1
        }}
      >
        oo
        <span style={{
          fontSize: '0.5em',
          position: 'absolute',
          top: '-0.3em',
          left: '0.4em',
          color: "#7b1fa2",
        }}>
          TD
        </span>
      </Typography>
      {/* Optional: Add an icon */}
      {/* <FashionIcon /> */}
    </Box>
  );
};

export default Logo;
