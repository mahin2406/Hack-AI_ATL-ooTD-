"use client";
import { useEffect } from "react";

export default function GeneratePage() {
  useEffect(() => {
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
        // CUSTOM BEHAVIOR SNIPPET
        onExpand: (conversationHandler) => {
          const checkMessages = (messages) => {
            if (messages.length === 0) {
              conversationHandler.sendWelcomeIntent();
            }
            conversationHandler.unsubscribe(checkMessages);
          };
          conversationHandler.subscribe(checkMessages);
        },
        // CUSTOM BEHAVIOR SNIPPET END
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
  );
}
