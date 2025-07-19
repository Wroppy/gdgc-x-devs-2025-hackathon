import React from "react";
import { Box, Avatar, ActionIcon } from "@mantine/core";
import {
  IconHome2,
  IconSearch,
  IconBell,
  IconSquarePlus,
} from "@tabler/icons-react";
import customerAvatar from "../../public/patrick-star.png";
import { Link, useLocation } from "react-router";

const BottomNavBar: React.FC = () => {
  const location = useLocation();
  return (
    <Box style={{ width: "100%", height: "60px" }}>
      <Box
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 1000,
          boxShadow: "0 -1px 3px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
        }}
      >
        <ActionIcon variant="subtle" size="lg" component={Link} to={"/customer"}> 
          {location.pathname === "/customer" ? (
            <IconHome2 color="orange" size={30} />
          ) : (
            <IconHome2 color="black" size={30} />
          )}
        </ActionIcon>
        <ActionIcon variant="subtle" size="lg">
          <IconSearch color="black" size={30} />
        </ActionIcon>

        <ActionIcon variant="subtle" size="lg">
          {location.pathname === "/customer/request" ? (
            <IconSquarePlus color="orange" size={30} />
          ) : (
            <IconSquarePlus color="black" size={30} />
          )}
        </ActionIcon>

        <ActionIcon variant="subtle" size="lg" component={Link} to={"/customer/offers"}>
          {location.pathname === "/customer/offers" ? (
            <IconBell color="orange" size={30} />
          ) : (
            <IconBell color="black" size={30} />
          )}
        </ActionIcon>

        <Avatar src={customerAvatar} radius="xl" size={35} />
      </Box>
    </Box>
  );
};

// Bell icon with the indicator
/* 
      <Indicator label="5" size={16} color="red">
        <ActionIcon variant="subtle" size="lg">
          <IconBell size={24} />
        </ActionIcon>
      </Indicator>
*/

export default BottomNavBar;
