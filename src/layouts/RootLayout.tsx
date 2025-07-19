import { useOs } from "@mantine/hooks";
import { Outlet } from "react-router";
import { OSContext } from "../contexts/OperatingSystemContext";
import { AuthContext } from "../contexts/AuthContext";

const RootLayout = () => {
  const os = useOs();

  // ✅ Hardcoded mock restaurant owner user
  const mockUser = {
    id: 1,
    name: "Eugene Krabs",
    email: "e.krabs@gmail.com",
    restaurant_id: 2,
    phone: "123-456-7890",
    avatar_url:
      "https://xivesioqwjixsrrkgkcv.supabase.co/storage/v1/object/public/restaurant-owner-image-url/restaurant_owners/eugene_krabs.jpeg",
  };

  const mockRole = "restaurant_owner";

  return (
    <div id="root-layout">
      <OSContext.Provider
        value={{ os, isMobile: os === "ios" || os === "android" }}
      >
        <AuthContext.Provider
          value={{
            user: mockUser,
            role: mockRole,
            setUser: () => {},
            setRole: () => {},
          }}
        >
          <div id="root-content">
            <Outlet />
          </div>
        </AuthContext.Provider>
      </OSContext.Provider>
    </div>
  );
};

export default RootLayout;
