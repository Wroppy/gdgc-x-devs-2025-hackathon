import React from "react";
import type { Offer } from "../../types/Offer";
import { Avatar, Box, Indicator, Text } from "@mantine/core";
import styles from "./restaurant-offer-box.module.css";
import { IconChevronRight } from "@tabler/icons-react";

type Props = { offer: Offer };

const RestaurantOfferBox = ({ offer }: Props) => {
  const { restaurantName, offerMessage, restaurantImage } = offer;
  return (
    <div className={styles.restaurantOfferBox}>
      <Indicator offset={7} color="accent" size={16}>
        <Avatar
          size="lg"
          radius="xl"
          src={restaurantImage}
          alt={restaurantName}
        />
      </Indicator>
      <Box>
        <Text size="xl" fw={500}>
          {restaurantName}
        </Text>
        <Text span>{offerMessage}</Text>
      </Box>
      <Box className={styles.icon}>
        <IconChevronRight size={24} />
      </Box>
    </div>
  );
};

export default RestaurantOfferBox;
