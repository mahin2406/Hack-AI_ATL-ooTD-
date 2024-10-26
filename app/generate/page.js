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
        theme: {
          primaryColor: "#8925da",
          chatWindowMaxHeight: 640,
        },
      });
    };
  }, []);

  return <div id="chat-widget-container" />;
}
