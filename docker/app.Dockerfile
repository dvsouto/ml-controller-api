# Dockerfile 
FROM node:16.15-alpine3.14

# Create app dir
RUN mkdir -p /opt/app
WORKDIR /opt/app

# Create user and group
RUN addgroup app
RUN adduser --disabled-password -G app app

# Copy app dir
COPY ./ .

# Set permissions
RUN chown -R app:app /opt/app

# Install linux dependences
RUN apk update
RUN apk add --no-cache vim curl

# Insrall dependences
RUN yarn install

USER app
EXPOSE 3000
CMD [ "yarn", "dev" ]