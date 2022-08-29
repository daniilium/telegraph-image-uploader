import { configService, imageService, telegraphService } from "#preload";
import { useEffect, useRef } from "react";

export function StepThree() {
  const tokenInput = useRef(null);

  const handleLoad = async () => {
    // await imageService.uploadImagesList();
    // const content = imageService.getImageTags();
    // if (!content) return;
    // const title = "boom";
    // const page = await telegraphService.createPage(title, content);
    // console.log(page);

    console.log(await telegraphService.getAccount());
  };

  const saveToken = () => {
    const newToken = tokenInput.current
      ? (tokenInput.current as HTMLInputElement).value
      : "";

    configService.writeKey("token", newToken);
  };

  useEffect(() => {
    if (tokenInput.current)
      (tokenInput.current as HTMLInputElement).value =
        configService.readKey("token");
  }, []);

  return (
    <div className="wrapper">
      <header>
        <h1 className="title">Шаг 3/3</h1>
        <p className="subtitle">Загрузка в telegra.ph</p>
      </header>

      <a href="#/step-two">назад</a>

      <p>Использовать токен:</p>
      <input
        type="text"
        ref={tokenInput}
        className="input"
        placeholder="ваш токен"
      />
      <button onClick={saveToken}>сохранить токен</button>

      <p>Имя автора:</p>
      <input type="text" className="input" placeholder="имя автора" />

      <p>Ссылка автора:</p>
      <input type="text" className="input" placeholder="ссылка" />

      <p>Будущий адрес страницы:</p>
      <input
        type="text"
        className="input"
        placeholder="адрес можно на русском"
      />

      <button onClick={handleLoad} className="button">
        Загрузить
      </button>
    </div>
  );
}
