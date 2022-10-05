import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  configService,
  fileService,
  imageService,
  pageService,
} from "#preload";
import { Button, ErrorPin, Text } from "../components/atoms";
import { Header } from "../components/organisms";
import {
  FileInput,
  FolderInput,
  List,
  ListItem,
} from "../components/molecules";
import { Container, Stack } from "../components/layout";
import { colors } from "../theme";

interface FormInput {
  folder: string;
  archive: string;
  bigImages?: string[];
}

export function StepOne() {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm<FormInput>();

  const navigate = useNavigate();

  const [folder, setFolder] = useState<string>(
    configService.readKey("workFolder")
  );
  const [archive, setArchive] = useState<string>();

  const [images, setImages] = useState<string[]>();
  const [bigImages, setBigImages] = useState<string[]>();
  const getImages = async () => {
    const files = await fileService.ls(folder);
    const images = imageService.filterImages(files);
    const sortImages = imageService.sort(images);

    setImages(sortImages);

    const bigImages = await imageService.sizeValidation(sortImages, folder);
    setBigImages(bigImages);
  };

  useEffect(() => {
    pageService.reset();
  }, []);

  useEffect(() => {
    (async () => {
      if (!archive) return;

      await fileService.unzip(archive);
      setFolder(fileService.getTempDir());
    })();
  }, [archive]);

  useEffect(() => {
    setValue("folder", folder);
    getImages();
  }, [folder, archive]);

  useEffect(() => {
    // validate the existence of images
    if (images?.length) clearErrors("folder");
    if (!images?.length)
      setError("folder", {
        type: "no images",
        message: "need images to upload",
      });
  }, [images]);

  useEffect(() => {
    // validate the size of images
    if (!bigImages) return;

    if (bigImages.length)
      setError("bigImages", {
        type: "big images",
        message: `The maximum size of images to upload is ${imageService.getMaxSizeFile()}, images below are not sized to fit:`,
      });

    if (!bigImages?.length) clearErrors("bigImages");
  }, [bigImages]);

  const onSubmit: SubmitHandler<FormInput> = async (values) => {
    console.log("submit: ", values);

    try {
      if (!images) return;

      pageService.setFolder(folder);
      navigate("/step-two");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <Stack gap={16}>
        <Header title="Step 1/3" subtitle="choose and sort image" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={16}>
            <FolderInput
              folder={folder}
              onChange={setFolder}
              label="Load image in folder:"
            />

            <FileInput
              label="Load image in archive:"
              placeholder="choose archive"
              accept=".zip"
              onChange={setArchive}
            />

            <List>
              <Text>Order of images to upload:</Text>
              {images?.map((image, index) => (
                <ListItem key={image}>
                  {index + 1}. {image}
                </ListItem>
              ))}
            </List>

            <Stack>
              <Text>Total image: {images?.length}</Text>
              {errors.folder?.type === "no images" && (
                <ErrorPin>{errors.folder?.message}</ErrorPin>
              )}
            </Stack>

            {errors.bigImages && (
              <Stack gap={16}>
                <List>
                  <Text style={{ color: colors.red }}>
                    {errors.bigImages?.message}
                  </Text>
                  {bigImages?.map((image, index) => (
                    <ListItem key={image}>
                      {index + 1}. {image}
                    </ListItem>
                  ))}
                </List>

                <Button onClick={getImages}>Update</Button>
              </Stack>
            )}

            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}
