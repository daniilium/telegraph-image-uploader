import styled from "@emotion/styled";
import {
  Button as MantineButton,
  ButtonProps,
  createPolymorphicComponent,
} from "@mantine/core";
import { colors } from "../theme";

const _StyledButton = styled(MantineButton)`
  height: 39px;
  // text-align: left;
  justify-content: flex-start;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  padding: 8px 16px 6px 16px;
  color: ${colors.black};
  background-color: white;
  border: 2px solid ${colors.black};
  border-radius: 18px;

  &:hover {
    background-color: white;
  }
`;

export const Button = createPolymorphicComponent<"button", ButtonProps>(
  _StyledButton
);
