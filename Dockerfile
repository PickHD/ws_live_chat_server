FROM node:alpine

WORKDIR /home/ws_live_chat_server/

COPY src /home/ws_live_chat_server/

RUN npm i

CMD npm run start
