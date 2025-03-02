FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL = $VITE_API_BASE_URL
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
