FROM node:lts-alpine
WORKDIR /solita-api
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:migrate:prod"]