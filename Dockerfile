FROM node:17-slim AS development
WORKDIR /backend
COPY package.json /backend
RUN npm install
COPY . /backend
RUN npm run build

FROM node:17-slim as production

WORKDIR /backend
COPY package*.json ./
RUN npm i --only=production
COPY --from=development /backend/dist ./dist
EXPOSE 3000
CMD ["npm", "run", "start:prod"]