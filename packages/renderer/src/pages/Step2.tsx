import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { configService, telegraphService, pageService } from "#preload";
import { Container, Stack } from "../components/layout";
import { Button, ErrorPin, InfoPin } from "../components/atoms";
import { TextInput } from "../components/molecules";
import { Header } from "../components/organisms";

interface FormInput {
  token: string;
  availability: string;
}

export function StepTwo() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useForm<FormInput>();

  const [token, setToken] = useState<string>(configService.readKey("token"));
  useEffect(() => {
    setValue("token", token);

    if (token.length !== 60) {
      setError("token", {
        type: "length",
        message: "length must be 60 characters",
      });
    } else clearErrors("token");

    clearErrors("availability");
  }, [token]);

  const onSubmit: SubmitHandler<FormInput> = async (values) => {
    const { token } = values;

    try {
      const user = await telegraphService.getAccount(token);
      if (!user) {
        setError("availability", {
          message: "invalid token",
        });
        return;
      }

      // console.log("submit: ", values);
      pageService.setToken(values.token);
      pageService.setAuthorName(user.author_name);
      pageService.setAuthorUrl(user.author_url);

      navigate("/step-three");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <Stack gap={16}>
        <Header title="Step 2/3" subtitle="use telegraph profile" />
        <a href="#/">назад</a>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={16}>
            <Stack>
              <TextInput
                initValue={token}
                onChange={setToken}
                label="Use token:"
                placeholder="token"
              />

              {errors.token?.type === "length" && (
                <ErrorPin>{errors.token.message}</ErrorPin>
              )}
              {errors["availability"] && (
                <ErrorPin>{errors["availability"].message}</ErrorPin>
              )}

              <InfoPin>
                the token is the login and password for pages management
              </InfoPin>

              <InfoPin>
                use the token to get the name of the author and a link to the
                author from the token
              </InfoPin>

              <InfoPin>
                https://octograph.netlify.app will allow you to create and
                configure a token
              </InfoPin>
            </Stack>

            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}
