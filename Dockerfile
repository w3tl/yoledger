FROM node:10.6-alpine as client

WORKDIR /app/
COPY client/package*.json ./
RUN npm install -qy
COPY client/ ./
ENV REACT_APP_GRAPHQL_ENDPOINT http://graphql:3030/graphql
RUN npm run build

# Setup the nginx server
FROM nginx:1.14-alpine

WORKDIR /app/
COPY --from=client /app/build/ /usr/share/nginx/html

WORKDIR /app/server/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
