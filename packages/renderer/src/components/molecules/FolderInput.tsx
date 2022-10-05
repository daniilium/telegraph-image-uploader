import styled from "@emotion/styled";
import { SyntheticEvent, useRef, useState } from "react";

import { configService } from "#preload";
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

type Props = {
  folder?: string;
  label?: string;
  onChange?(path: string): void;
  // changeFolder?(newFolder: string): void;
};

export function FolderInput(props: Props) {
  const { folder, label, onChange } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [workFolder, setWorkFolder] = useState(folder);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputRef.current) inputRef.current.click();
  };

  const chooseFolder = (e: SyntheticEvent) => {
    if (!inputRef.current) return;
    const input = inputRef.current;

    const file = input.files?.[0] as any;
    const filePath = file.path as string;

    const newFolder = configService.chooseFolder(filePath);

    setWorkFolder(newFolder);
    if (onChange) onChange(newFolder);
  };

  return (
    <Label>
      <Stack>
        {label}
        <_button onClick={(e: SyntheticEvent) => handleClick(e)}>
          {workFolder}
        </_button>

        <input
          ref={inputRef}
          onChange={chooseFolder}
          style={{ display: "none" }}
          type="file"
          // @ts-ignore
          directory=""
          webkitdirectory=""
        />
      </Stack>
    </Label>
  );
}
