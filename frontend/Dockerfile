FROM node:8
WORKDIR /var/www/weatherapp/frontend
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "start"]