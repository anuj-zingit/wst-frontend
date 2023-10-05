FROM node:16.14.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm i --silent
RUN npm i fsevents@latest -f --save-optional
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build:production

# nginx configuration
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]