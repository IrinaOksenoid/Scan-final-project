Этот проект — учебное задание, направленное на освоение современных технологий разработки фронтенда и работы с API. Сервис предназначен для поиска публикаций о компаниях по ИНН и ориентирован на бизнес и индивидуальных предпринимателей, которым нужно проверять добросовестность подрядчиков на основе публичных данных.

Инструкция по запуску

    Убедитесь, что у вас установлен Node.js версии 16 или выше.
    Клонируйте репозиторий:

git clone https://github.com/IrinaOksenoid/Scan-final-project
cd Scan-final-project

Установите зависимости:

npm install

Запустите проект в режиме разработки:

npm run dev

Откройте проект в браузере по адресу, указанному в терминале (обычно http://localhost:5173).

Основные возможности сервиса:

    Авторизация пользователей с помощью токенов.
    Разграничение доступа для авторизованных и неавторизованных пользователей.
    Сохранение токенов в localStorage для минимизации повторных запросов.
    Проверка обязательных полей и маскировка личной информации.
    Реализация lazy loading для комфортного пользовательского опыта.
    Работа с API для получения данных.
    Использование популярных инструментов, таких как Redux и React Context, для управления состоянием.

Проект создан с использованием Vite, что обеспечивает высокую скорость разработки.

Ключевые навыки, полученные в проекте

    Авторизация с токенами:
        Реализация безопасной авторизации, сохранение токенов в localStorage.
        Защита платной информации от анонимных пользователей.
    Работа с API:
        Интеграция фронтенда с бэкендом.
        Оптимизация запросов.
    Валидация форм:
        Проверка обязательных полей, предотвращение отправки данных с ошибками.
        Маскировка личной информации.
    Оптимизация пользовательского опыта:
        Lazy loading больших массивов данных.
        Адаптивный интерфейс для удобной работы на разных устройствах.
    Современные технологии:
        Использование React, Redux, React Context.
        Управление состоянием и структурированием данных.
