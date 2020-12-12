# Software Engineering Project - Backend

This is the backend service the project. It was deleveloped by Bhavesh Shah, Zeal Patel, Greg Kimatov, Yihui Wuchen, and Victoria Yang for our Software Engineering class using Typescript, Node, Express, MongoDB, and Mongoose.

Project description coming soon.


## User Accounts (feel free to make your own account for any user)

##### Customer
email: lskywalker@jediacademy.org
password: lskywalker

##### Manager
email: dvader@sith.org
password: dvader

##### Chef
email: askywalker@jediacademy.org
password: askywalker

##### Delivery
email: djarin@bountyguild.org
password: djarin

## Setup

##### Clone the repository

```
git clone https://github.com/zealptl/SWE-project-backend.git
```

##### Install dependencies

It is recomended to install TypeScript globally on your machine using

```
npm install -g typescript
```

Run the following to install the necessary dependencies

```
npm i
```

##### Setup env file

Create a `.env` file in your repository folder, paste the following and replace your username, and password with your credentials

```
DB_URI=mongodb+srv://username:password@swe-db.sejgt.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=MY_JWT_SECRET
```

##### Setup sendgrid

Perform the following three steps in your terminal in the root directory and replace apikey with provided key

```
1) echo "export SENDGRID_API_KEY=apikey > sendgrid.env
2) echo "sendgrid.env" >> .gitignore
3) source ./sendgrid.env
```

## Repo Structure

All of the TypeScript code goes in `src` folder

##### Helper functions

Write any helper functions that can be reused in other places in `src/helpers` folder

##### MongoDB models

Write MongoDB models in `src/models` folder

##### REST Routes

In the `server.ts` file, import your routes from `src/routes` and structure the url as `/api/something`

Create a route file for each model that will conist of the REST methods.

- Write the middlewares for these routes in `src/routes/middlewares` folder.
  - Name a POST middleware as createModelName
  - Name a GET middleware as getModelName
  - Name a PUT/ PATCH middleware as updateModelName
  - Name a DELETE middleware as deleteModelName

## Available scripts

#### `npm run server`

Starts a nodemon server that watches changes to your TypeScript code and refresh the server without having to run node command after each change.

It should print `Server started on port 5000` and `MongoDB Connected` if everything ran correctly.

Run this script to make requests using Postman.

#### `npm run build`

Builds the app for production to the `build` folder.

#### `npm run start`

Runs production version of the code
