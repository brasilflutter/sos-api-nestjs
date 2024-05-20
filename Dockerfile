FROM node:20
LABEL authors="boginni"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

ENTRYPOINT ["top", "-b"]