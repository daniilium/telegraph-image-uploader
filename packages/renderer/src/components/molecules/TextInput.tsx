import styled from "@emotion/styled";
import { useRef, useState } from "react";

import { Label } from "../atoms";
import { Stack } from "../layout";
import { colors, fonts } from "/@/theme";

const Input = styled.input`
  border: 1px solid ${colors.black};
  border-radius: 18px;
  font-family: ${fonts.main};
  font-size: 18px;
  padding: 0 12px;
  height: 36px;

  &:focus {
    border: 2px solid ${colors.black};
    outline: none;
  }
`;

interface Props {
  label?: string;
  placeholder?: string;
  onChange?(value: string): void;
  initValue?: string;
}

export const TextInput = (props: Props) => {
  const { label, placeholder, onChange, initValue } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>(initValue || "");

  const handleChange = () => {
    if (!inputRef.current) return;
    const newValue = inputRef.current.value;

    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <Label>
      <Stack>
        {label}
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          type="text"
          placeholder={placeholder}
        />
      </Stack>
    </Label>
  );
};
