# base image
FROM node:alpine
# set dir
WORKDIR /app
# copy files
COPY package.json ./
COPY ./ ./
# expose port
EXPOSE 4000
# install dependencies
RUN npm install
# start
CMD npm start