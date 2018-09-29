FROM node:8
WORKDIR /var/www/weatherapp/backend
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 9000
CMD ["npm", "start"]