FROM node:18.18.2

WORKDIR /frontend
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]