import React from  "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import NotFound from "./NotFound";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

/* Heroku trials, ended bad XD */
//    "start": "ts-node-esm src/index.tsx",
//    "heroku-postbuild": "npm install && npm run build"

//  "type": "module"

// "proxy": "http://localhost:5000"

// Heroku environment
// const port = process.env.PORT || 5000;
// // app.use("/", express.static("build"))
// app.get("*", (req, res) => {
//   res.sendFile(__dirname.replace("src\\backend", "build\\index.html"))
// })

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("build"))
// }

//Procfile contents
//web: npm start