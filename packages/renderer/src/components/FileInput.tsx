import { FileInput as MantineFileInput } from "@mantine/core";
import styled from "@emotion/styled";
import { colors, fonts } from "../theme";

export const FileInput = styled(MantineFileInput)`
  & .mantine-FileInput-input {
    border: 1px solid ${colors.black};
    border-radius: 18px;
    font-family: ${fonts.main};
    font-size: 16px;

    &:focus {
      border: 2px solid ${colors.black};
    }
  }

  & .mantine-FileInput-label {
    font-family: ${fonts.main};
    font-size: 18px;
  }
`;
