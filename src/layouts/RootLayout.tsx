import { useOs } from "@mantine/hooks";
import { Outlet } from "react-router";
import { OSContext } from "../contexts/OperatingSystemContext";

const RootLayout = () => {
  const os = useOs();

  return (
    <div id="root-layout">
      <OSContext.Provider value={{
        os,
        isMobile: os === 'ios' || os === 'android'
      }}>
        <div id="root-content">
          <Outlet />
        </div>
      </OSContext.Provider>
    </div>
  );
};

export default RootLayout;
