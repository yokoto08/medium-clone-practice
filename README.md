# Medium Clone (Платформа для публикации статей)

[![Maintainability](https://qlty.sh/gh/yokoto08/projects/medium-clone-practice/maintainability.svg)](https://qlty.sh/gh/yokoto08/projects/medium-clone-practice)

## Описание проекта
Full-Stack веб-приложение, представляющее собой платформу для публикации статей и блогинга. Авторизованные пользователи могут создавать публикации, оставлять комментарии и оценивать статьи.

## Стек технологий
* **Frontend:** React, Redux, React-Router
* **Backend:** Node.js, Express
* **База данных:** MongoDB, Cloudinary
* **Деплой:** Vercel, Render

## Ссылка на рабочий проект
🌐 **[https://medium-clone-practice-tcw5.vercel.app](https://medium-clone-practice-tcw5.vercel.app)**

## Инструкция по локальному запуску

```bash
git clone [https://github.com/yokoto08/medium-clone-practice.git](https://github.com/yokoto08/medium-clone-practice.git)

Bash
cd medium-clone-practice  
cd server
npm install

Создайте файл .env в папке server:

Code snippet
MONGODB_URI=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

Bash
npm start

Bash
cd client
npm install --legacy-peer-deps
npm start