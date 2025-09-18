FROM docker.io/library/python:3.13-slim
LABEL "language"="python"
LABEL "framework"="fastapi"

ENV PORT=8080
WORKDIR /app

RUN apt-get update && apt-get install -y build-essential pkg-config clang nodejs npm && rm -rf /var/lib/apt/lists/*
RUN npm install -f -g yarn@latest
COPY . .
RUN sed '/-e/d' requirements.txt | pip install -r /dev/stdin
RUN pip install -r requirements.txt
RUN yarn install
RUN yarn build

EXPOSE 8080
CMD yarn start
