# cchs-mobile

### Getting Started

#### Install and use node version 16
`$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash # install nvm`<br>
`$ nvm install v16`<br>
`$ nvm use v16`<br>

#### Install yarn
https://linuxize.com/post/how-to-install-yarn-on-ubuntu-20-04/

#### install dependencies and start server
`$ yarn install && yarn start`<br>

#### Deploy
1. set environment variable VUE_APP_BE_URL in the .env.local file to the production BE url
2. `yarn deploy`

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
