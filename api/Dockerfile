FROM strapi/strapi
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
ENV DATABASE_CLIENT=sqlite
ENV DATABASE_FILENAME=./.tmp/data.db
EXPOSE 1337
CMD ["npm", "start"]