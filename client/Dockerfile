FROM node:10-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json /app/
RUN npm install --quiet
CMD ["npm", "start"]
