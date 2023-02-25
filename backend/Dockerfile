FROM node:19.4.0

# Install Dependencies
COPY package*.json ./

RUN npm install --silent
RUN npm uninstall bcrypt
RUN npm install bcrypt

# Copy app source code
COPY . .

EXPOSE 8000

# RUN ["chmod", "+x", "/usr/local/bin/docker-entrypoint.sh"]

CMD ["npm","start"]