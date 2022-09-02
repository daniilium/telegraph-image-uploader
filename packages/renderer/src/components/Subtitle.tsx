import styled from "@emotion/styled";
import { createPolymorphicComponent, Text, TextProps } from "@mantine/core";

const _Subtitle = styled(Text)`
  color: gray;
`;

export const Subtitle = createPolymorphicComponent<"text", TextProps>(
  _Subtitle
);
