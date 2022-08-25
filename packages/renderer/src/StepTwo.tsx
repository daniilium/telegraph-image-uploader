import { configService, fileService, imageService } from "#preload";
import { useEffect, useState } from "react";

const cutName = (name: string) => {
  if (name.length > 25) return `${name.slice(0, 10)} ... ${name.slice(-10)}`;
  else return name;
};

const imagesText = (images: string[]) => {
  return images
    .map((name, index) => `${index + 1}. ${cutName(name)}  \n`)
    .join("");
};

export function StepTwo() {
  const [images, setImages] = useState([""]);
  const [overSize, setOverSize] = useState<null | string[]>(null);
  const folder = configService.readKey("workFolder");

  const getImages = () => {
    const asyncWork = async () => {
      const files = await fileService.ls(folder);
      const images = imageService.filterImages(files);
      const sortImages = imageService.sort(images);

      const overSize = imageService.sizeValidation(sortImages);
      setOverSize(overSize);
      console.log(overSize);

      setImages(sortImages);
    };

    asyncWork();
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      <h1>шаг 2/3</h1>
      <a href="/">назад</a>
      <br />
      <br />

      <p>Изображений в папке: {images.length}</p>

      {overSize && (
        <>
          <p>Слишком большие изображения:</p>
          {overSize.map((name) => (
            <p>{name}</p>
          ))}
        </>
      )}

      <div>
        <p>Порядок изображений:</p>
        <textarea
          value={imagesText(images)}
          cols={30}
          rows={images.length}
          readOnly
          disabled
        ></textarea>
      </div>

      <button onClick={getImages}>Обновить</button>
      <br />
      <br />
      <a href="/step-three">Подтверждаю</a>
    </>
  );
}
