"use client";
import { useEffect, useState } from "react";
import { useAuth, useClerk, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Container, Button, Toolbar, Typography, AppBar, Box, Grid, Paper, Slide, Zoom } from "@mui/material";
import "@fontsource/poppins"; // Importing the 'Poppins' font

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { isSignedIn } = useAuth();
  const { openSignIn, openSignUp } = useClerk();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/generate');
    } else {
      openSignIn();
    }
  };

  return (
    <>
      <Head>
        <title>EasyLearning</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="fixed" sx={{ backgroundColor: "#1e1e2f", borderBottom: "3px solid #9c27b0" }}>
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              color: "#9c27b0",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: '700',
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
              letterSpacing: '0.1rem',
              textTransform: 'uppercase',
              transition: "color 0.3s",
              "&:hover": {
                color: "#7b1fa2",
              },
            }}
          >
            ooTD
          </Typography>
          <SignedOut>
            <Button color="inherit" sx={{ color: "#9c27b0", mr: 1 }} onClick={openSignIn}>
              Login
            </Button>
            <Button color="inherit" sx={{ backgroundColor: "#9c27b0", color: "#fff" }} onClick={openSignUp}>
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Main content section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: '#282c34',
          color: '#fff',
          pt: 10,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
          <Zoom in timeout={1000}>
            <Box sx={{ textAlign: "center", my: { xs: 4, sm: 6, md: 9 } }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: '700',
                  mb: 2,
                  color: "#9c27b0",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: '0.1rem',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
                }}
              >
                Welcome to ooTD
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}>
                Get Dressed Easily
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  py: 1.5,
                  px: 3,
                  backgroundColor: '#9c27b0',
                  color: '#fff',
                  fontWeight: '600',
                  letterSpacing: '0.05rem',
                  '&:hover': {
                    backgroundColor: '#7b1fa2',
                  },
                }}
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </Box>
          </Zoom>

          {/* Features section */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Slide direction="up" in timeout={700}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 4,
                    textAlign: 'center',
                    backgroundColor: "#424242",
                    color: "#fff",
                    borderRadius: 3,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Easy Text and Image Input
                  </Typography>
                  <Typography>
                    Enter text and images; we&apos;ll generate your suitable outfit effortlessly.
                  </Typography>
                </Paper>
              </Slide>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Slide direction="up" in timeout={800}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 4,
                    textAlign: 'center',
                    backgroundColor: "#424242",
                    color: "#fff",
                    borderRadius: 3,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Accessible Anywhere
                  </Typography>
                  <Typography>
                    Access our recommendations on any device, anywhere.
                  </Typography>
                </Paper>
              </Slide>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Slide direction="up" in timeout={900}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 4,
                    textAlign: 'center',
                    backgroundColor: "#424242",
                    color: "#fff",
                    borderRadius: 3,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Smart Fashion Advisor
                  </Typography>
                  <Typography>
                    AI-powered advisor optimized for dressing great everyday.
                  </Typography>
                </Paper>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
