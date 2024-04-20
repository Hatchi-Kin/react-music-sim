# Use an official Node.js runtime as the base image
FROM node:18

WORKDIR /app

ADD . /app

RUN npm install

RUN npm run build

# Disable Next.js's anonymous telemetry program
RUN npx next telemetry disable

EXPOSE 3000

# Start the application
CMD [ "npm", "run", "start" ]