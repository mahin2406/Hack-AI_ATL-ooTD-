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

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await fetch("/api/generate-image");
        const data = await response.json();
        if (data.status === "success") {
          setTrends(data.data);
        }
      } catch (error) {
        console.error("Error fetching trends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();

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
          Fashion Trends of the DAY!!
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {trends.map((trend) => (
              <Grid item xs={12} sm={6} md={4} key={trend._id}>
                <Paper
                  elevation={6}
                  sx={{
                    padding: 3,
                    backgroundColor: "#292929",
                    color: "#f9f9f9",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
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
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#7322b1",
                      },
                      borderRadius: "20px",
                      padding: "8px 16px",
                    }}
                  >
                    Buy Now
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Static Image Section */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {[
            "images/img1.jpg",
            "images/image2.jpg",
            "images/image3.jpg",
            "images/image4.jpg",
            "images/image5.jpg",
            "images/image6.jpg",
            "images/image7.jpg",
            "images/image8.jpg",
          ].map((imageSrc, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  overflow: "hidden",
                  borderRadius: "8px",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <img
                  src={`/${imageSrc}`} // Prefix with '/' to point to the public directory
                  alt={`Fashion ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
