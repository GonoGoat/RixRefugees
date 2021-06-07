FROM node:latest

WORKDIR /home

RUN apt update

RUN apt install -y nano git

RUN git clone https://github.com/GonoGoat/RixRefugees

RUN cd RixRefugees || rm docker database -rd

COPY .env ./RixRefugees/node

COPY ./ssl/server.key ./RixRefugees/node

COPY ./ssl/server.cer ./RixRefugees/node

RUN npm install pm2 -g
