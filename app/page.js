"use client";
import { useEffect, useState } from "react";
import { useAuth, useClerk, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Head from "next/head";
import Link from 'next/link';
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
    // Setup chat widget
    const widgetScript = document.createElement("script");
    widgetScript.src = "https://unpkg.com/@nlxai/chat-widget/lib/index.umd.js";
    widgetScript.defer = true;
    document.body.appendChild(widgetScript);

    widgetScript.onload = () => {
      const widget = nlxai.chatWidget.create({
        config: {
          botUrl: "https://bots.dev.studio.nlx.ai/c/7GErDJjuzsOoqHq8x6mI1/p4FbTuX49biyg1xVgMESA",
          headers: { "nlx-api-key": "MNlhiZVq8x0-tVDXfmCIv=PnMEfcMD-8" },
          languageCode: "en-US",
        },
        titleBar: {
          title: "Customer Support",
          withCollapseButton: true,
          withCloseButton: true,
        },
        onExpand: (conversationHandler) => {
          const checkMessages = (messages) => {
            if (messages.length === 0) {
              conversationHandler.sendWelcomeIntent();
            }
            conversationHandler.unsubscribe(checkMessages);
          };
          conversationHandler.subscribe(checkMessages);
        },
        theme: {
          primaryColor: "#8925da",
          chatWindowMaxHeight: 640,
        },
      });
    };
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
        <title>ooTD</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="fixed" sx={{ backgroundColor: "#1e1e2f", borderBottom: "3px solid #9c27b0" }}>
        <Toolbar>
          <img
            src="/images/Logo.png"
            alt="ooTD Logo"
            style={{
              height: 55,
              marginRight: '1rem',
              objectFit: 'contain',
            }}
          />
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
            <Box
              sx={{
                textAlign: "center",
                my: { xs: 4, sm: 6, md: 9 },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "#9c27b0",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Welcome to ooTD
              </Typography>
              <Typography variant="h6" sx={{ mb: 4 }}>
                Step Into Style with the Hottest Trends of the Day!
              </Typography>
              <Button
                variant="contained"
                onClick={handleGetStarted}
                sx={{
                  mt: 2,
                  backgroundColor: "#9c27b0",
                  "&:hover": { backgroundColor: "#7b1fa2" },
                }}
              >
                Get Started
              </Button>
            </Box>
          </Zoom>

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
                  Effortless outfits, everyday!!
                  </Typography>
                  <Typography>
                    Transform your Wardrobe with curated looks that matches style of daily trend.
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
                    24x7 Customer Support!!
                  </Typography>
                  <Typography>
                    AI-powered chat assistance is here to solve your problems 24/7.
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
                  Accessible Anywhere
                  </Typography>
                  <Typography>
                  Access our recommendations on any device, anywhere.
                  </Typography>
                </Paper>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Chat Widget */}
      <div 
        id="chat-widget-container" 
        style={{ 
          position: 'fixed', 
          bottom: 80, // Adjust this value to move it higher
          right: 20, 
          zIndex: 1000,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Shadow for floating effect
          borderRadius: '8px', // Makes the edges rounded
          backgroundColor: 'white', // Background color
        }} 
      />
    </>
  );
}
