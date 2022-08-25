import { configService, fileService, imageService } from "#preload";
import { useEffect, useState } from "react";

export function StepTwo() {
  const [images, setImages] = useState([""]);
  const folder = configService.readKey("workFolder");

  useEffect(() => {
    getImagesInWorkFolder();
  }, []);

  const getImagesInWorkFolder = () => {
    const asyncWork = async () => {
      const files = await fileService.ls(folder);
      const images = imageService.filterImages(files);
      setImages(images);
    };

    asyncWork();
  };
  return (
    <>
      <h1>шаг 2/3</h1>
      <a href="/">назад</a>
      <br />
      <br />

      <p>Изображений в папке: {images.length}</p>
      <p>Порядок изображений:</p>
      <p>{}</p>

      <br />
      <br />
      <a href="/step-three">Подтверждаю</a>
    </>
  );
}
