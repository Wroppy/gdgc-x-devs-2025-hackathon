import { Box, Select, Stack, Text } from "@mantine/core";
import React from "react";
import BottomNavBar from "../../layouts/BottomNavBar";

type Props = {};

const CustomerViewOffersPage = (props: Props) => {
  return <Stack>
    <Text fw={500} size="xl">
    Offers from restaurants
    </Text>
    <Select
      label="Sort by"
      placeholder="Select sorting option"
      data={[
        { value: 'date', label: 'Date' },
        { value: 'restaurant', label: 'Restaurant Name' },
        { value: 'price', label: 'Price' },
      ]}
    />
    <Box>
      
    </Box>
    <BottomNavBar />
  </Stack>;
};

export default CustomerViewOffersPage;
