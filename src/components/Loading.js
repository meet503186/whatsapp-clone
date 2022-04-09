import React from "react";
import { Circle } from "better-react-spinkit";

function Loading(props) {

    document.title = "WhatsApp 2.0"

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "100vh" }}>
      <img
        src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
        alt="image"
        style={{ marginBottom: 10 }}
        height={200}
      />
      <Circle color="#3CBC28" size={60} />
    </div>
  );
}

export default Loading;
