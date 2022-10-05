import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { fileService, pageService } from "#preload";
import { Container, Stack } from "../components/layout";
import { Header, Modal } from "../components/organisms";
import { FileInput, TextInput } from "../components/molecules";
import { Button, ErrorPin } from "../components/atoms";

interface FormInput {
  title: string;
  topText?: string;
  endImage?: string;
}

export function StepThree() {
  const {
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useForm<FormInput>();

  const [pageLink, setPageLink] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    setValue("title", title);
    const length = title?.length || 0;

    if (length < 1) {
      setError("title", {
        type: "minLength",
        message: "minimum length 1 character",
      });
    }

    if (length > 256) {
      setError("title", {
        type: "maxLength",
        message: `exceeds the allowed length by ${length - 256} character(s)`,
      });
    }

    if (length >= 1 && length <= 256) clearErrors("title");
  }, [title]);

  const onSubmit: SubmitHandler<FormInput> = async (values) => {
    console.log("submit: ", values);

    try {
      if (values.endImage) await pageService.setEndImage(values.endImage);
      if (values.topText) pageService.setTopText(values.topText);
      pageService.setTitle(values.title);

      const page = await pageService.create();
      setPageLink(page?.url);
      setShowModal(true);
    } catch (error) {
      alert(error);
    }
  };

  const copyLink = () => {
    if (pageLink) fileService.copyText(pageLink);
  };

  return (
    <>
      <Container>
        <Stack gap={16}>
          <Header title="Step 3/3" subtitle="upload to Telegra.ph" />

          <a href="#/step-two">назад</a>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={16}>
              <Stack>
                <TextInput
                  label="Page title:"
                  placeholder="title"
                  onChange={setTitle}
                />

                {errors.title?.type === "minLength" && (
                  <ErrorPin>{errors.title.message}</ErrorPin>
                )}
                {errors.title?.type === "maxLength" && (
                  <ErrorPin>{errors.title.message}</ErrorPin>
                )}
              </Stack>

              <TextInput
                label="Add the text to the top of the page:"
                placeholder="text"
                onChange={(value: string) => setValue("topText", value)}
              />

              <FileInput
                label="Add an image to the end:"
                placeholder="image"
                onChange={(fullPath: string) => setValue("endImage", fullPath)}
              />

              <Button type="submit">Upload</Button>

              <Button onClick={copyLink}>Copy</Button>

              {pageLink && (
                <Modal
                  title="Success"
                  text={`Page created, copy url? \n ${pageLink}`}
                  onClick={copyLink}
                  show={showModal}
                />
              )}
            </Stack>
          </form>
        </Stack>
      </Container>
    </>
  );
}
