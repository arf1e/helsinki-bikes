FROM node:lts-alpine
WORKDIR /solita-frontend

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
EXPOSE 3001

CMD ["npm", "start"]