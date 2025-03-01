FROM node:23-alpine3.20
WORKDIR /crud-react-node-mySQL-go-new/backend
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 8800
CMD ["npm", "start"]
