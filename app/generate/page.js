"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";

export default function GeneratePage() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch fashion trends from the server
    const fetchTrends = async () => {
      try {
        const response = await fetch('/api/generate-image'); // Adjust the endpoint as needed
        const data = await response.json();
        if (data.status === 'success') {
          setTrends(data.data);
        }
      } catch (error) {
        console.error("Error fetching trends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();

    // Load the NLX chatbot script
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
          darkMessageColor: "#000000",
          lightMessageColor: "#EFEFEF",
          white: "#FFFFFF",
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
          spacing: 12,
          borderRadius: 8,
          chatWindowMaxHeight: 640,
        },
      });
    };
  }, []);

  return (
    <div>
      <div
        id="chat-widget-container"
        style={{
          position: 'fixed',
          bottom: 80, // Adjust this value to move it higher
          right: 20,
          zIndex: 1000,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Adds shadow for a floating effect
          borderRadius: '8px', // Optional: makes the edges rounded
          backgroundColor: 'white', // Optional: adds a background color
        }}
      />

      {/* Fashion Trends Section */}
      <Box sx={{ marginTop: 10, padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Latest Fashion Trends
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {trends.map((trend) => (
              <Grid item xs={12} sm={6} md={4} key={trend._id}>
                <Box
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: 2,
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <Typography variant="h6">{trend.name}</Typography>
                  <Typography variant="body2">{trend.description}</Typography>
                  <Typography variant="h6">${trend.price}</Typography>
                  <Grid container spacing={1}>
                    {trend.images.map((image) => (
                      <Grid item xs={12} key={image.url}>
                        <img 
                          src={image.url} 
                          alt={trend.name} 
                          style={{ width: '100%', borderRadius: '4px' }} 
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
}
