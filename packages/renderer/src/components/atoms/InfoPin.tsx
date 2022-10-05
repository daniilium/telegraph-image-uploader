import styled from "@emotion/styled";
import { Text } from "./Text";
import { colors } from "/@/theme";

export const InfoPin = styled(Text)`
  position: relative;
  padding-left: 12px;
  color: ${colors.gray};

  &:before {
    position: absolute;
    top: 3px;
    left: 0px;
    content: "•";
  }
`;
