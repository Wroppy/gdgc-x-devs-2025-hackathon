import React from 'react';
import { Box, Center, Avatar, Indicator, ActionIcon } from '@mantine/core';
import {
  IconHome2,
  IconSearch,
  IconBell,
  IconSquarePlus,
} from '@tabler/icons-react';
import customerAvatar from '../../public/patrick-star.png';

const BottomNavBar: React.FC = () => {
  return (
    <Box
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1000,
        boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <ActionIcon variant="subtle" size="lg">
        <IconHome2 color="black" size={30} />
      </ActionIcon>

      <ActionIcon variant="subtle" size="lg">
        <IconSearch color="black" size={30} />
      </ActionIcon>

      <ActionIcon variant="subtle" size="lg">
        <IconSquarePlus color="black" size={30} />
      </ActionIcon>
      
      <ActionIcon variant="subtle" size="lg">
        <IconBell color="black" size={30} />
        </ActionIcon>

      <Avatar
        src={customerAvatar}
        radius="xl"
        size={35}
      />
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
