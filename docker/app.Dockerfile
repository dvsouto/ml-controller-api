# Dockerfile 
FROM node:16.15-alpine3.14

ARG APP_STAGE
ENV APP_STAGE=${APP_STAGE}

RUN echo "Running on ${APP_STAGE} stage"

# Create user and group
RUN addgroup --system app
RUN adduser --disabled-password --system -G app app

# Install linux dependences
RUN apk update
RUN apk add --no-cache vim curl bash sudo

# Add user to sudoers
RUN mkdir -p /etc/sudoers.d
RUN echo '%app ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers.d/app
RUN chmod 0440 /etc/sudoers.d/app

# Create app dir
RUN mkdir -p /opt/app && chown app:app /opt/app
WORKDIR /opt/app

# Copy app dir
COPY ./ .

# Set permissions
RUN chown -R app:app /opt/app
RUN chmod -R 755 /opt/app

# Define user
USER app

# Install dependences
RUN yarn install

# Set node_modules permission
# RUN chown -R app:app /opt/app/node_modules
# RUN chmod -R 755 /opt/app/node_modules

# Expose port and run
EXPOSE 3000

RUN if [ "$APP_STAGE" = "prod" ]; then \
  sudo yarn build; \
fi

CMD sudo yarn $(echo ${APP_STAGE})
# CMD [ "sudo", "yarn", "dev" ]