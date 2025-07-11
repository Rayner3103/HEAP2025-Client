import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as React from "react";

import Home from "./views/home/Home";
import "./App.css";
import Header from "./components/Header";
import About from "./views/about/About";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./views/signup/SignUp";
import Login from "./views/login/Login";
import Profile from "./views/profile/Profile";
import Event from "./views/event/Event";
import { LoadingProvider } from "./context/OverlayContext";
import { AlertDialogProvider } from "@/context/AlertDialogContext";
import LoadingOverlay from "./components/Overlay";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <LoadingProvider>
            <AlertDialogProvider>
              <Header />
              <LoadingOverlay />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/event/:eventId" element={<Event />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AlertDialogProvider>
          </LoadingProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
