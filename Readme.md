# Backend for WorldWideStudents
- done in Node.js with Express and MongoDB

# Getting started
- clone the repo
- create an `index.js` file in a `/config` folder in the root dir and write this in it(replace details with your memes)
```js
module.exports = {
    databaseURL: ``, // Write your db url
    secret: '', // write your secret
    session: { session: false },
}
```
- run `npm/yarn install`
- make sure to have nodemon installed
- `nodemon app` in the root dir
- test the backend with postman etc etc

# How it works
- in order to create a request you need to send requests on port 400
- basic request route: `http://localhost:4000/api/users/login`
- some of the routes are `/register`, `/login`, `usersList`

Coded with <3 