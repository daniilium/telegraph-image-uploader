import { configService, fileService, imageService } from "#preload";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [overSize, setOverSize] = useState<string[]>([""]);
  const folder = configService.readKey("workFolder");
  const navigate = useNavigate();

  const getImages = () => {
    const asyncWork = async () => {
      const files = await fileService.ls(folder);
      const images = imageService.filterImages(files);
      const sortImages = imageService.sort(images);

      const overSize = imageService.sizeValidation(sortImages);
      setOverSize(overSize);

      setImages(sortImages);
    };

    asyncWork();
  };

  const displayNone = { display: "none" };

  const showError = () => {
    if (overSize.length === 0) return displayNone;
  };

  const showNextButton = () => {
    if (overSize.length > 0) return displayNone;
  };

  useEffect(() => {
    getImages();
  }, []);

  const onSubmit = () => {
    if (!overSize.length) {
      imageService.setImageList(images);
      navigate("/step-three");
    }
  };

  return (
    <div className="wrapper">
      <header>
        <h1 className="title">Шаг 2/3</h1>
        <p className="subtitle">Проверка и подготовка изображений</p>
      </header>
      <a href="#/">назад</a>

      <div>
        <p>Порядок загрузки изображений:</p>
        <textarea
          value={imagesText(images)}
          cols={30}
          rows={images.length}
          readOnly
          disabled
        ></textarea>

        <p>Всего изображений: {images.length}</p>
      </div>

      <button onClick={getImages} className="button">
        Обновить
      </button>

      <div className="error" style={showError()}>
        <p>
          [Ошибка] есть изображения больше {imageService.getMaxSizeFile()} MB:
        </p>
        <textarea
          value={imagesText(overSize)}
          cols={30}
          rows={overSize.length}
          readOnly
          disabled
        ></textarea>
      </div>

      <button onClick={onSubmit} className="button" style={showNextButton()}>
        Дальше
      </button>
    </div>
  );
}
