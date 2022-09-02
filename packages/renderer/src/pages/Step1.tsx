import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  List,
  ScrollArea,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { configService, fileService, imageService } from "#preload";

import { Button } from "../components/Button";
import { FileInput } from "../components/FileInput";
import { FolderInput } from "../components/FolderInput";
import { Subtitle } from "../components/Subtitle";

export function StepOne() {
  const [folder, setFolder] = useState(configService.readKey("workFolder"));
  const [images, setImages] = useState([""]);
  const [imageErrors, setImageErrors] = useState<string[] | null>();
  const viewportImages = useRef<HTMLDivElement>(null);
  const viewportErrorsImages = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const getImages = async () => {
    const files = await fileService.ls(folder);
    const images = imageService.filterImages(files);
    const sortImages = imageService.sort(images);
    const overSize = imageService.sizeValidation(files);
    setImageErrors(overSize);

    setImages(sortImages);
  };

  useEffect(() => {
    getImages();

    // проскролить список изображений до конца
    if (viewportImages.current)
      viewportImages.current.scrollTo({
        top: viewportImages.current.scrollHeight,
        behavior: "smooth",
      });
  }, [folder]);

  const form = useForm({});

  const onSubmit = async (values: any) => {
    await getImages();

    if (images.length === 0) {
      form.setErrors({ images: "нужны изображения для загрузки" });
      return;
    }

    const errors = imageService.sizeValidation(await fileService.ls(folder));
    if (errors.length > 0) {
      form.setErrors({ imageErrors: "эти файлы не загрузятся" });
      return;
    }

    imageService.setImageList(images);
    navigate("/step-two");
  };

  return (
    <Container size={500}>
      <Space h="xl" />
      <Stack spacing={"xs"}>
        <header>
          <Title order={1}>Шаг 1/3</Title>
          <Subtitle>Выбор и подготовка изображений</Subtitle>
        </header>

        <Stack spacing={"xs"}>
          <FolderInput
            folder={folder}
            changeFolder={setFolder}
            label="Загрузить из папки:"
          />

          <FileInput
            placeholder="Выбрать архив zip"
            label="или загрузить архив..."
            accept=".zip"
          />
        </Stack>

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack spacing={"xs"}>
            <Text>Список изображений:</Text>

            <ScrollArea
              style={{ width: 300, height: images.length * 20 }}
              viewportRef={viewportImages}
            >
              <List type="ordered" size="xs" withPadding>
                {images.map((image) => (
                  <List.Item key={image}>{image}</List.Item>
                ))}
              </List>
            </ScrollArea>

            <Text>Всего изображений: {images.length}</Text>

            <Text color="red">{form.errors?.images}</Text>

            {imageErrors?.length !== 0 && (
              <>
                <Text>
                  Есть {imageErrors?.length} файл(ов) больше{" "}
                  {imageService.getMaxSizeFile()}
                  MB:
                </Text>

                <Text color="red">{form.errors?.imageErrors}</Text>
              </>
            )}

            <ScrollArea
              style={{
                width: 300,
                height: imageErrors ? imageErrors.length * 20 : 0,
              }}
              viewportRef={viewportErrorsImages}
            >
              <List type="ordered" size="xs" withPadding>
                {imageErrors?.map((image) => (
                  <List.Item key={image}>{image}</List.Item>
                ))}
              </List>
            </ScrollArea>

            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}

function cutName(name: string) {
  if (name.length > 25) return `${name.slice(0, 10)} ... ${name.slice(-10)}`;
  else return name;
}

function imagesText(images: string[]) {
  return images
    .map((name, index) => `${index + 1}. ${cutName(name)}  \n`)
    .join("");
}
