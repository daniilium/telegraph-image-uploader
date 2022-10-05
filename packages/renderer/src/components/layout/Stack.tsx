import styled from "@emotion/styled";

export const Stack = styled.div<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap && gap + "px"};
`;
