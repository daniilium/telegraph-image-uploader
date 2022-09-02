import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Space, Stack, Switch, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

import { configService, telegraphService } from "#preload";

import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { Subtitle } from "../components/Subtitle";

export function StepTwo() {
  const navigate = useNavigate();

  const [tokenSaveCheckbox, setTokenSaveCheckbox] = useState(true);

  const form = useForm({
    initialValues: {
      token: configService.readKey("token"),
    },

    validate: {
      token: (value) =>
        value.length === 60 ? null : "Токен должен быть 60 символов",
    },
  });

  const onSubmit = async (values: any) => {
    const token = values.token;
    const userData = await telegraphService.getAccount(token);

    if (userData) {
      if (tokenSaveCheckbox) configService.writeKey("token", token);
      navigate("/step-three");
    }

    if (!userData) {
      form.setErrors({ token: "Токен инвалид" });
      return;
    }
  };

  return (
    <Container size={500}>
      <Space h="xl" />
      <Stack spacing={"xs"}>
        <header>
          <Title order={1}>Шаг 2/3</Title>
          <Subtitle>настройка аккаунта telegra.ph</Subtitle>
        </header>
        <a href="#/">назад</a>

        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <Stack spacing={"xs"}>
            <TextInput
              label="Используемый токен"
              withAsterisk
              {...form.getInputProps("token")}
            />

            <Switch
              label="Сохранить токен"
              color="dark"
              size="md"
              checked={tokenSaveCheckbox}
              onChange={(event) =>
                setTokenSaveCheckbox(event.currentTarget.checked)
              }
            />

            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}
