FROM node:latest

WORKDIR /home

RUN apt update

RUN apt install -y nano git

RUN git clone https://github.com/GonoGoat/RixRefugees

RUN cd RixRefugees || rm docker database -rd

COPY .env ./RixRefugees/node

COPY server.key ./RixRefugees/node

COPY server.cert ./RixRefugees/node

RUN npm install pm2 -g
