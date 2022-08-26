import { configService } from "#preload";
import { SyntheticEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function StepOne() {
  const [workFolder, setWorkFolder] = useState(
    configService.readKey("workFolder")
  );
  const folderInput = useRef(null);
  const navigate = useNavigate();

  const chooseFolder = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0] as any;
    const filePath = file.path as string;

    const newWorkFolder = configService.chooseFolder(filePath);
    setWorkFolder(newWorkFolder);

    configService.writeKey("workFolder", newWorkFolder);
  };

  const handleNext = () => {
    navigate("#/step-two");
  };

  return (
    <div className="wrapper">
      <header>
        <h1 className="title">Шаг 1/3</h1>
        <p className="subtitle">Выбор изображений</p>
      </header>

      <p>
        загрузить из <span>{workFolder}</span>
      </p>

      <label className="link">
        или загружать из ...
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

      <button onClick={handleNext} className="button">
        Дальше
      </button>
    </div>
  );
}
