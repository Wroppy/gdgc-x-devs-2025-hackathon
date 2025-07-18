import { type UseOSReturnValue } from "@mantine/hooks";
import { createContext } from "react";
type OSContextType = {
  os: UseOSReturnValue;
  isMobile?: boolean;
};
const defaultOS: OSContextType = {
  os: "undetermined",
  isMobile: false,
};

const OSContext = createContext<OSContextType>(defaultOS);

export { OSContext, type OSContextType };
