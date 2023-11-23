FROM strapi/strapi
WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
ENV DATABASE_CLIENT=sqlite
ENV DATABASE_FILENAME=./data.db
EXPOSE 1337
CMD ["yarn", "start"]