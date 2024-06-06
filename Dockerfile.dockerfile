FROM node:14
WORKDIR /app
COPY packae.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
