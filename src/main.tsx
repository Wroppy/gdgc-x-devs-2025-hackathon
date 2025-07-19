import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout.tsx";
import HomePage from "./pages/home-page/HomePage.tsx";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/code-highlight/styles.css";
import Dev from "./pages/Dev.tsx";
import theme from "./theme.ts";
import NotFoundPage from "./pages/not-found-page/NotFoundPage.tsx";
import FeedbackPage from "./pages/feedback-page/FeedbackPage.tsx";
import LoginPage from "./pages/login-page/LoginPage.tsx";
import CustomerHomePage from "./pages/customer-home-page/CustomerHomePage.tsx";
import Test from "./pages/Test.tsx";
import Request from "./pages/request-page/RequestPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/dev" element={<Dev />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="customer">
              <Route index element={<CustomerHomePage />} />
              <Route path="request" element={<Request />} />
            </Route>
            <Route path="/test" element={<Test />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
