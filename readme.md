# Dependency
As we recommend to using "Yarn" as a dependency manager.
To use following command, you should install "Yarn" package manager.

By using NPM in Node.JS
> npm install -g yarn

By using brew
> brew install yarn

---

## To start development server
> yarn start

### If you want to change the development server port
run following command everytime before run "yarn start" command

#### Windows
> set PORT=1234

#### Linux & macOS
> export PORT=1234

---

## To start test & watchman
> yarn test

---

## Create a deployable package
> yarn run build

After run this command, the folder **'build'** will appear which you can use it to deploy later. 

For example,
> Move the files in "build" folder into web-server (apache, nginx) directory

---

## Change AWS API Gateway SDK
You can change your aws-api-gateway-sdk later.

> 1. Move the sdk into "aws-api/sdk" directory
> 2. run command "yarn run awsapi"