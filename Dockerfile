FROM ubuntu:22.04
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update &&     apt-get install -y python3 python3-pip ffmpeg curl nodejs npm &&     apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json package-lock.json* ./
COPY . .
RUN npm install

EXPOSE 5000
CMD ["node", "server.js"]