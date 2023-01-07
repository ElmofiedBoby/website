FROM node:latest
WORKDIR /app

# Environment Variables
ENV USER=nijo
ENV PASS=Boby2002
ENV URI=cluster0.l9m35rn.mongodb.net/?retryWrites=true&w=majority
ENV DB=nijo
ENV COL=blog
ENV PORT=3001
ENV FRONTEND_PORT=3000

# Setup Environment
COPY package.json /app
RUN npm install

RUN mkdir code
COPY code/index.js /app/code
EXPOSE $PORT/tcp

CMD node code/index.js $PORT