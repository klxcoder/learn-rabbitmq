# Stage 1: Install dependencies
FROM node:22 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

# Stage 2: Run the application
FROM node:22
WORKDIR /app
COPY --from=build /app /app