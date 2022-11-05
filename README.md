# ML Controller API

This application consume the Mercado Livre API.

## Requirements
Install this dependencies:
- **Node.js** (v14.17.6) and **n** manager
```sh
sudo apt-get install nodejs
yarn global add n
sudo n 14.17.6
```

- **Yarn** (v1.22.18)
```sh
sudo apt-get install curl
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt install yarn
```

- **Docker Engine** (v20.10.21) and **Docker Compose**
```sh
# Setup docker repository
sudo apt-get install ca-certificates curl gnupg sb-release
sudo mkdir -p /etc/apt/keyrings & curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install docker-ce and docker-compose plugin
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

## Installation
To install this application, run the command with npm or yarn:
```sh
yarn install
```

## Run application
First, create the environment file on the root: .env

- **Development**: Run the docker and migrations:
```sh
yarn docker-start
yarn migrate:up
```

The application running on http://localhost:3000 and database Postgres on port 5432.
Use **"yarn log-app"** to view logs of app container and **"yarn log-postgres"** to view logs of database container.

- **Production**: Build with **"yarn build"** and run the script **"yarn start"**
```sh
yarn build
yarn start
```

The application has builded on /dist folder.

## Test
Run command **"yarn test"** to start jest/supertest tests:
```sh
yarn test
```

---

**Powered By:** 
* NodeJS (v14.17.6)
* Yarn (v1.22.18)
* Docker (v20.10.21)
* Typescript (v4.7.4)
* Express (v4.18.1)
* TypeORM (v0.3.6)
* Babel (v7.18.6)
* Jest (v28.1.2)