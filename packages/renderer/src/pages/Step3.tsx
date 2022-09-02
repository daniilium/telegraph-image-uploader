import {
  Container,
  CopyButton,
  Modal,
  Space,
  Stack,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

import { imageService, telegraphService } from "#preload";

import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { Subtitle } from "../components/Subtitle";

export function StepThree() {
  const [pageURL, setPageURL] = useState("null");
  const createPage = async (title: string) => {
    const images = await imageService.uploadImagesList();
    if (!images) {
      alert("нет images");
      setIsDisabled(false);
      return;
    }

    const imageTags = imageService.createImageTags(images);

    const content = imageTags;
    const page = await telegraphService.createPage(title, content);
    if (page) setPageURL(page.url);
    setOpened(true);
  };

  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
    },

    validate: {
      title: (value) =>
        value.length >= 1 && value.length <= 256
          ? null
          : "Длина должна быть от 1 до 256 символов",
    },
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const onSubmit = (values: any) => {
    const title = values.title;
    const chars = title.replace(/ /g, "");

    if (chars) {
      setIsDisabled(true);
      createPage(title);
    }

    if (!chars) {
      form.setErrors({
        title: "Заголовок должен содержать символы кроме пробелов",
      });
      return;
    }
  };

  return (
    <>
      <Container size={500}>
        <Space h="xl" />
        <Stack spacing={"xs"}>
          <header>
            <Title order={1}>Шаг 3/3</Title>
            <Subtitle>Загрузка в telegra.ph</Subtitle>
          </header>

          <a href="#/step-two">назад</a>

          <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack spacing={"xs"}>
              <TextInput
                label="Заголовок страницы:"
                placeholder="Заголовок страницы"
                {...form.getInputProps("title")}
              />
              <Button loading={isDisabled} disabled={isDisabled} type="submit">
                Создать страницу
              </Button>
            </Stack>
          </form>
        </Stack>
      </Container>

      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Загрузка завершена"
      >
        <p>{pageURL}</p>
        <CopyButton value={pageURL}>
          {({ copied, copy }) => (
            <Button color={copied ? "teal" : "blue"} onClick={copy}>
              {copied ? "Copied url" : "Copy url"}
            </Button>
          )}
        </CopyButton>

        <a href="#/" className="link">
          или перейти к первому шагу
        </a>
      </Modal>
    </>
  );
}
