# Score App

> ### An application to display a hello world message built with ReactJS v18, i18next, TypeScript, Mui, eslint, prettier and SCSS.

To run this project I will be assuming that you have all the tools to run ReactJs v18 (NodeJS >= 6).

---

## Contents

- [Score App](#score-App)
  - [Contents](#contents)
  - [Getting started](#getting-started)
  - [Available Scripts](#available-scripts)
  - [Project structure](#project-structure)
  - [Technologies used](#technologies-used)
    - [ReactJs](#reactjs)
    - [Material ui](#material-ui)
    - [i18next](#i18next)
    - [TypeScript](#typescript)
    - [Rtk query](#rtk-query)

---

## Getting started

Install all the dependencies and the packages

    yarn install

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Start the local development server

    yarn start

You can now access the server at http://localhost:3000

---

## Available Scripts

| Script              | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `install`           | Installs all the needed packages and dependecies.      |
| `start`             | Runs the app in the development mode.                  |
| `docker:dev`        | Runs app in development mode with docker               |
| `docker:build-prod` | build app in production mode with docker               |
| `docker:start-prod` | Start production image with docker on default port 80  |
| `build`             | Builds the app for production to the `build` folder.   |
| `prettier`          | Format your code with Prettier                         |
| `typecheck`         | Typecheck your app.                                    |
| `test`              | Launches the test runner in the interactive watch mode |
| `lint`              | Lint both your code and style with ESLint.             |
| `lint:fix`          | Fix ESLint errors.                                     |
| `lint:style`        | Lint your css with ESLint.                             |
| `eject`             | Remove the single build dependency from your project.  |

---

## Project structure

```
|-- .husky (1)
|-- build (2)
|-- node_modules (3)
|-- public (4)
    |-- favicon.png
    |-- index.html
    |-- manifest
|-- src (5)
    |-- assets (6)
        |-- fonts
        |-- sass
        |-- icons
        |-- images
    |-- components (7)
    |-- config (8)
        |-- constant
        |-- enums (9)
    |-- features (10)
    |-- hooks (11)
    |-- layouts (12)
    |-- locales (13)
    |-- pages (14)
    |-- redux (15)
        |-- api
        |-- slices
        |-- store.ts
        |-- hooks.ts
    |-- routes (16)
    |-- theme (17)
    |-- types (18)
        |-- interfaces
        |-- models
    |-- utils ()
        |-- helpers (19)
        |-- services (20)
        |-- validators (21)
    |-- App.tsx (22)
    |-- i18n.ts
    |-- index.tsx (23)
    |-- server-worker.ts
|-- .env (24)
|-- .eslintrc
|-- .prettierrc
|-- .stylelintrc
|-- package.json (25)
|-- README.md
|-- yarn.lock
```

(1) : an auto generated folder by husky.

(2) : Is the location of your final, production-ready build. this directory won’t exist until you run npm build or yarn build.

(3) : Is where packages installed by NPM or Yarn will reside.

(4) : Is where your static files reside. (They automatically get copied to build while using create-react-app)

(5) : Is where your dynamic files reside (written codes).

(6) : Contains static files (img,sass).

(7) : The list of shared components.

(8) : Is where we define the configuration of the app.

(9) : Where we define the a sets of named constants that is used in the app.

(10) : list of main features of our app example(authentication, products etc ...).

(11) : list of custom hooks to be used in our app

(12) : List of global layouts of our website.

(13) : Contains the internationalization used in the application (contains all messages displayed in interfaces)

(14) : Contains all the interfaces of the application. Each interface is composed of one or more components.

(15) : Contains all Api calls and global states of the application.

(16) : Contains all the different types of routes.

(17) : Contains the design system of the application(colors, fonts ...).

(18) : Contains all the types used in the application.

(19) : Contains all the helpers used in the application and can be used in another applications.

(20) : Contains all the specific helpers used in this application.

(21) : All inputs and files validators.

(22) : This is the file for App Component. App Component is the main component in React which acts as a container for all other components.

(23) : The entry point of the application. this file has the following line of code which is very significant.

(24) : Contains all the environment variables.

(25) : This File has the list of node dependencies which are needed.

---

## Technologies used

### ReactJs

React is a JavaScript library for building user interfaces, it is used to build single-page applications and allows us to create reusable UI components.

### Material ui

React components for faster and easier web development, used for the design.

### i18next

react-i18next is a powerful internationalization framework for React / React Native which is based on i18next. (Learn once — translate everywhere)

### TypeScript

TypeScript is a superset of JavaScript, meaning that it contains all of the functionality of JavaScript and then some. Therefore, any program written in valid JavaScript will also run as expected in TypeScript. In fact, TypeScript compiles simply to plain JavaScript.
TypeScript offers us more control over our code via type annotations, interfaces, and classes.

### Rtk query

RTK Query is a powerful data fetching and caching tool. It is designed to simplify common cases for loading data in a web application, eliminating the need to hand-write data fetching & caching logic yourself.

RTK Query is an optional addon included in the Redux Toolkit package, and its functionality is built on top of the other APIs in Redux Toolkit.
