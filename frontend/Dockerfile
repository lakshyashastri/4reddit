FROM node:19.4.0 as build-stage

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

# RUN ["chmod", "+x", "/usr/local/bin/docker-entrypoint.sh"]

CMD ["npm", "start"]

