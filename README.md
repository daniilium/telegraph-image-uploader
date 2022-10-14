# telegraph-image-uploader

## Описание/Description:
RU: Это консольное приложение решает проблему загрузки папки или архива с изображениями в telegra.ph

EN: This console application solves the problem of loading a folder or archive with images in telegra.ph

## Функционал/Feature list:
```
RU:
1. Использование приватного или публичного токена
  ! от токена зависит имя автора и ссылка автора на новой странице
2. Загрузка изображений из папки
3. Загрузка изображений из архива
4. Валидация максимального размера изображения
5. Запомнить токен и рабочую категорию через меню настроек
```
```
EN:
1. Using a private or public token
  ! the token determines the author's name and the author's link on the new page
2. Uploading images from a folder
3. Uploading images from an archive
4. Validating the maximum image size
5. Remember the token and work category via the settings menu
```


## Как использовать/How use:
```
RU:
1. Скачать этот репозиторий с приложением как архив (Code > Download ZIP) и распаковать его 
2. Через терминал зайти в папку с приложением
3. Установить зависимости через команду "npm install"
4. Запустить программу используя команду "npm run start"
```
```
EN:
1. Download this repository with the application as an archive (Code > Download ZIP) and unzip it 
2. Use the terminal to go to the folder with the application
3. Install dependencies via the "npm install" command
4. Launch the program using the "npm run start" command
```

### Why not electron.js?
The [develop branch](https://github.com/u1f5a4/telegraph-image-uploader/tree/develop) contains an implementation of this program using react and node.js. Due to difficulties with signing the application on different operating systems, the application has only been tested on macOS.
