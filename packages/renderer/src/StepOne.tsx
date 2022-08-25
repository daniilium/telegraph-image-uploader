import { SyntheticEvent, useRef, useState } from "react";

import { configService } from "#preload";

export function StepOne() {
  const [workFolder, setWorkFolder] = useState(
    configService.readKey("workFolder")
  );
  const folderInput = useRef(null);

  const chooseFolder = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0] as any;
    const filePath = file.path as string;

    const newWorkFolder = configService.chooseFolder(filePath);
    setWorkFolder(newWorkFolder);

    configService.writeKey("workFolder", newWorkFolder);
  };

  return (
    <>
      <h1>шаг 1/3</h1>
      <p>
        загрузить изображения из <span>{workFolder || "*не выбрано*"}</span>
      </p>
      <label style={{ textDecoration: "underline" }}>
        или запомнить и загружать из ...
        <input
          style={{ display: "none" }}
          type="file"
          // @ts-ignore
          directory=""
          webkitdirectory=""
          ref={folderInput}
          onChange={chooseFolder}
        />
      </label>
      <br />
      <br />
      <a href="/step-two">Подтверждаю</a>
    </>
  );
}
