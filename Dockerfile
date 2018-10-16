FROM node:8
WORKDIR /usr/src/nodapi
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]