import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div id="root-layout">
      <div id="root-content">
      <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
