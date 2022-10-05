import styled from "@emotion/styled";

import { colors } from "/@/theme";

export const Button = styled.button`
  cursor: pointer;
  height: 39px;
  justify-content: flex-start;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  padding: 8px 16px 6px 16px;
  color: ${colors.black};
  background-color: white;
  border: 2px solid ${colors.black};
  border-radius: 18px;

  &:active {
    transform: translate(0, 2px);
  }
`;

// interface Props {
//   onClick?(): void;
//   children: ReactNode;
// }
// export const Button = (props: Props) => {
//   return <_Button onClick={props.onClick}>{props.children}</_Button>;
// };
