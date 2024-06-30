FROM node
LABEL maintainer mario.santisteban@tecsup.edu.pe
RUN git clone -q https://github.com/CarlosRoqueM/BackendApp.git
WORKDIR BackendApp
COPY .env ./
COPY serviceAccountKey.json ./
RUN npm install
EXPOSE 3001
CMD ["node", "server.js"]