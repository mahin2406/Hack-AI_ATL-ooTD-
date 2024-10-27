"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";

export default function GeneratePage() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatedImage, setGeneratedImage] = useState(null);

  // Automatically generate image on page load
  useEffect(() => {
    generateImage();

    const widgetScript = document.createElement("script");
    widgetScript.src = "https://unpkg.com/@nlxai/chat-widget/lib/index.umd.js";
    widgetScript.defer = true;
    document.body.appendChild(widgetScript);

    widgetScript.onload = () => {
      nlxai.chatWidget.create({
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
          darkMessageColor: "#000000",
          lightMessageColor: "#EFEFEF",
          fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
          borderRadius: 8,
        },
      });
    };
  }, []);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
      } else {
        console.error("Image generation failed:", data.error);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#1a1a1a", minHeight: "100vh", padding: "20px" }}>
      <div
        id="chat-widget-container"
        style={{
          position: "fixed",
          bottom: 80,
          right: 20,
          zIndex: 1000,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
          borderRadius: "12px",
          backgroundColor: "#292929",
        }}
      />

      <Box sx={{ marginTop: 8, padding: 3, textAlign: "center" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#8925da", fontWeight: "bold", mb: 4 }}
        >
          Fashion Trends of the Day!
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress color="inherit" />
          </Box>
        ) : generatedImage ? (
          <Box mt={4}>
            <img
              src={generatedImage}
              alt="Generated AI"
              style={{ maxWidth: "100%", borderRadius: "12px" }}
            />
          </Box>
        ) : null}

        <Button
          variant="contained"
          onClick={generateImage}
          sx={{
            backgroundColor: "#8925da",
            color: "#fff",
            "&:hover": { backgroundColor: "#7322b1" },
            borderRadius: "20px",
            padding: "8px 16px",
            marginTop: "20px",
          }}
        >
          Regenerate Image
        </Button>

        <Grid container spacing={4} mt={2}>
          {trends.map((trend) => (
            <Grid item xs={12} sm={6} md={4} key={trend._id}>
              <Paper
                elevation={6}
                sx={{
                  padding: 3,
                  backgroundColor: "#292929",
                  color: "#f9f9f9",
                  borderRadius: "10px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 8px 30px rgba(137, 37, 218, 0.8)",
                  },
                }}
              >
                <Typography variant="h5" sx={{ color: "#8925da", mb: 1 }}>
                  {trend.name}
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ color: "#b0b0b0" }}>
                  {trend.description}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                  ${trend.price}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#8925da",
                    "&:hover": { backgroundColor: "#7322b1" },
                    borderRadius: "20px",
                  }}
                >
                  Buy Now
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
