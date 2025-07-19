import { Box, Select, Text } from "@mantine/core";
import React, { useState } from "react";

type Props = {};
// Sort by distance, time

const MessagesContainer = (props: Props) => {
  const [filter, setFilter] = useState<string>("");
  return (
    <div>
      <Box p="md">
        <Text size="lg" fw={500}>Messages</Text>
        <Select
          label="Sort by"
          placeholder="Select filter"
          data={[
            { value: "distance", label: "Distance" },
            { value: "time", label: "Time" },
          ]}
          clearable
          value={filter}
          onChange={(value) => setFilter(value || "")}
        />
      </Box>
    </div>
  );
};

export default MessagesContainer;
