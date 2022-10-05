import { ReactNode } from "react";
import { Text } from "../atoms";
import { Stack } from "../layout";
import { colors } from "/@/theme";

interface ChildrenProps {
  children: ReactNode;
}

export const List = ({ children }: ChildrenProps) => {
  return <Stack>{children}</Stack>;
};

export const ListItem = ({ children }: ChildrenProps) => {
  return <Text style={{ paddingLeft: 16, fontSize: 14 }}>{children}</Text>;
};
