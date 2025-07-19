import { useOs } from "@mantine/hooks";
import { Outlet } from "react-router";
import { OSContext } from "../contexts/OperatingSystemContext";
import { AuthProvider } from "../contexts/AuthContext";

const RootLayout = () => {
  const os = useOs();

  return (
    <div id="root-layout">
      <OSContext.Provider
        value={{ os, isMobile: os === "ios" || os === "android" }}
      >
        <AuthProvider>
          {" "}
          {/* 👈 Wrap app in AuthProvider */}
          <div id="root-content">
            <Outlet />
          </div>
        </AuthProvider>
      </OSContext.Provider>
    </div>
  );
};

export default RootLayout;
