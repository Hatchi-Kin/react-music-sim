# Use an official Node.js runtime as the base image
FROM node:18

WORKDIR /app

ADD . /app

RUN npm install

# Disable Next.js's anonymous telemetry program
RUN npx next telemetry disable

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]