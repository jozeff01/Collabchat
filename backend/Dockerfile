FROM python:3.12-slim

# Устанавливаем зависимости
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем проект
COPY . .

# Выполняем миграции и запускаем сервер (на внутреннем порту 8000)
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "collabchat.wsgi:application"]
