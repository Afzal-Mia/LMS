import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { CourseContextProvider } from "./context/CourseContext.jsx";

export const server = "https://lms-backend-ls35.onrender.com/";
console.log("server");
console.log(server);


ReactDOM.createRoot(document.getElementById("root")).render(
    <UserContextProvider>
      <CourseContextProvider>
        <App />
      </CourseContextProvider>
    </UserContextProvider>
);
