import { TextInput as MantineTextInput } from "@mantine/core";
import styled from "@emotion/styled";

import { colors, fonts } from "../theme";

export const TextInput = styled(MantineTextInput)`
  & .mantine-Input-input {
    border: 1px solid ${colors.black};
    border-radius: 18px;
    font-family: ${fonts.main};
    font-size: 16px;

    &:focus {
      border: 2px solid ${colors.black};
    }
  }

  & .mantine-TextInput-label {
    font-family: ${fonts.main};
    font-size: 18px;
  }
`;
