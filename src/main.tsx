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
import CustomerChatPage from "./pages/customer-chat-page/CustomerChatPage.tsx";
import { showNotification } from "@mantine/notifications";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import Request from "./pages/request-page/RequestPage.tsx";
import RestaurantHomePage from "./pages/restaurant-home-page/RestaurantHomePage.tsx";
import FindRequestsPage from "./pages/restaurant-find-requests/FindRequestsPage.tsx";
import OfferPage from "./pages/offer-page/OfferPage.tsx";
import CustomerViewOffersPage from "./pages/customer-view-offers-page/CustomerViewOffersPage.tsx";
import RestaurantChatBox from "./layouts/RestaurantChatBox.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<LoginPage />} />
              <Route path="/dev" element={<Dev />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="customer">
                <Route index element={<CustomerHomePage />} />
                <Route path="chat/:offerId" element={<CustomerChatPage />} />
                <Route path="request" element={<Request />} />
                <Route path="feedback" element={<FeedbackPage />} />
                <Route path="offers" element={<CustomerViewOffersPage />} />
              </Route>
              <Route path="/restaurant">
                <Route index element={<RestaurantHomePage />} />
                <Route path="find" element={<FindRequestsPage />} />
                <Route path="offer" element={<OfferPage />} />
                <Route path="chat/:offerId" element={<RestaurantChatBox />}>
                  <Route index element={<CustomerChatPage />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
