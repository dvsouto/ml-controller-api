# Myndo API Gateway

This application consume the Mercado Livre API.

## Requirements
Install this dependencies:
- **Node.js** (v14.17.6) and **n** manager
```sh
sudo apt-get install nodejs
yarn global add n
n 14.17.6
```
- Yarn (1.22.18)
```sh
sudo apt-get install curl
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt install yarn
```

## Installation
To install de application, run the command with npm or yarn:
```sh
yarn install
```

## Run application
- **Development**: Run the script **"yarn dev"**
```sh
yarn dev
```

- **Production**: Build with **"yarn build"** and run the script **"yarn start"**
```sh
yarn build
yarn start
```

---

**Powered By:** 
* NodeJS (v14.17.6)
* Yarn (v1.22.18)
* Typescript (v4.7.4)
* Express (v4.18.1)
* TypeORM (v0.3.6)
* Babel (v7.18.6)
* Jest (v28.1.2)