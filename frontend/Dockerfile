FROM node:latest
WORKDIR /app

# Environment Variables
ENV BACKEND_PORT=3001

# Setup Environment
COPY public /app/public
COPY package.json /app
RUN npm install

COPY src /app/src
EXPOSE 3000/tcp

CMD npm start