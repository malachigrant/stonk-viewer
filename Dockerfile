FROM node:10-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm build
COPY . /app
EXPOSE 8080
CMD ["npm", "server"]
