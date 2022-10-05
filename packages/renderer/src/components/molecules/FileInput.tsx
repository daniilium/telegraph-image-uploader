import styled from "@emotion/styled";
import { SyntheticEvent, useRef, useState } from "react";

import { colors, fonts } from "../../theme";
import { Label } from "../atoms";
import { Stack } from "../layout";

const _button = styled.button`
  width: 100%;
  text-align: left;
  cursor: pointer;
  background-color: white;
  border: 1px solid ${colors.black};
  border-radius: 18px;
  font-family: ${fonts.main};
  font-size: 16px;
  padding: 0 12px;
  height: 36px;

  &:active {
    border: 2px solid;
  }
`;

const _placeholder = styled.span`
  font-family: ${fonts.main};
  font-size: 18px;
  color: ${colors.gray};
`;

type Props = {
  placeholder?: string;
  label?: string;
  accept?: string;
  onChange?(path: string): void;
};

export function FileInput(props: Props) {
  const { placeholder, label, accept, onChange } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<string>();

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputRef.current) inputRef.current.click();
  };

  const chooseFolder = (e: SyntheticEvent) => {
    if (!inputRef.current) return;
    const input = inputRef.current;

    const file = input.files?.[0];
    const fileName = file?.name;

    if (!fileName) return;

    // !Переписать
    // @ts-ignore
    const filePath = file?.path;

    setFile(fileName);

    if (onChange) onChange(filePath);
  };

  return (
    <Stack>
      <Label>
        {label}
        <_button onClick={(e: SyntheticEvent) => handleClick(e)}>
          {file || <_placeholder>{placeholder}</_placeholder>}
        </_button>

        <input
          ref={inputRef}
          onChange={chooseFolder}
          style={{ display: "none" }}
          type="file"
          accept={accept}
          placeholder={placeholder}
        />
      </Label>
    </Stack>
  );
}
