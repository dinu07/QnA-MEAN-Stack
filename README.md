# QnA Application

This is a discussion forum that offers topics under which Questions can be raised and Comments can be shared on the Questions.

# Pre-requisites

The dev environment setup would require you to have the following

- node - v8.9+ onwards
- docker - any version

The application & the mongo instance runs in a docker container.


## Build the application

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Next execute `docker build -t 'qna:latest' .`. This is responsible for building the docker image for the application.


## Start the application

Before you start the application, ensure you have build the application as mentioned in the steps above.

To start the application, execute `docker-compose up -d`. This is responsible for running the application & mongo db instance it connects to.

If you want to connect to existing instance, please configure `server/config.js` file.

Next, Navigate to `http://localhost:8080/`.


## Stop the application

To stop the application, execute `docker-compose down`


## Restart the application

To restart the application, execute `docker-compose restart`

## Running unit tests

Run `npm run test` to execute angular test cases [Karma] (https://karma-runner.github.io) 

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor (http://www.protractortest.org/).

**Note:** Make sure both Appln is started before you execute the E2E tests.


## Running lint

Run `npm run lint` to check linting errors.(https://eslint.org/).

## Fixing lint errors

Run `npm run lint-fix` to fix linting errors,

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

**Note:** If `ng` is not recognised then it's possible that `angular-cli` is not installed, you need to install it using `npm install -g @angular/cli`


## Command used to generate this project
Project is originally generated usign Angular CLI, and was added the express part manually