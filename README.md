# Парсер данных

## GitHub

### 1. Клонируйте репозиторий

```shell
git clone ..
```

## Backend

### 1. Установка Poetry

```shell
cd backend
poetry shell
poetry install
```

### 2. Установка Alembic

```shell
poetry run alembic revision --autogenerate -m "Alembic Migration"
poetry run alembic upgrade head
```

### 3. Запуск

```shell
poetry run python src/main.py
```

## Frontend

### 1. Установка Node Vite

```shell
cd frontend
nvm install 20
npm create vite@latest
cd my-vite-project
npm install
```

### 2. Установка Tailwind CSS

```shell
npm install -D tailwindcss
npx tailwindcss init
```

### 3. Установка DLS

```shell
npm install antd
npm install axios
```

### 4. Запуск

```shell
npm run dev
```

## Docker Compose

### 1. Настройка среды

- Создайте в корневой папке файл, названный .env

- Определите в нём переменные среды, например:

```shell
POSTGRES_USER=postgres 
POSTGRES_PASSWORD=postgres  
POSTGRES_DB=test1 
DB_HOST=db 
DB_PORT=5432 
DB_NAME=test1 
```

### 2. Создайте и запустите Docker Compose
```shell
docker compose up --build
```