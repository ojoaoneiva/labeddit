# [Labeddit](https://labeddit-joaoneiva.surge.sh/)

<p align="center">
  <img src="./template/src/assets/Images/github/ecommerce.gif" alt="project gif" width="600">
</p>

Go to the API Docummentation [here](https://documenter.getpostman.com/view/27685475/2s9Y5eMeZG)

[Front-end repository](https://github.com/ojoaoneiva/labeddit/tree/main/front-end)

[Back-end repository](https://github.com/ojoaoneiva/labeddit/tree/main/back-end)

## About:
The "Labeddit" project aims to build a fullstack website, with a frontend of a small social media plataform and its backend applicaction that builds an API with data source for users, posts, post's comments and likes. The front-end is mobile-first and consists on three pages: Home, login and signup, following the design provided by Figma.


## Functionalities:
- [x]   <strong>Login Page:</strong> The user can connect (if the user and email are valid and previously created) and the app will autenticat the data, and generate an acess token and go to the Feed page.
- [x]  <strong>Sign up Page:</strong> The user can creat an account (with email that haven't been used before), and the app will generate an acess token and go to the Feed page.
- [x]  <strong>Feed page:</strong> Only authorized to be seen if a valid user is logged and the JWT token. The page shows all the posts created by all users.
- [x]  <strong>Like or dislike:</strong> The user can like or dislike a post or a comment.
- [x]  <strong>Create post or comment:</strong> The user can create on the textfield a new post, or can comment on an existing post.
- [x]  <strong>Layered Architecture:</strong> The app's structure was built and organized with layered architecture to make the code more organized and for its reusability, maintainability and scalability.
- [x]  <strong>Frontend + Api:</strong> Integration with the backend API, using React, axios and endpoints that receives data, based on the API's documentation.
- [x]  <strong>React Router:</strong> Navigation between pages with React Router.
- [x]  <strong>Hashed passwords:</strong> All the passwords are hashed using BcryptJS before its storage on the databse, so the information is protected.
- [x]  <strong>Database:</strong> All the users, posts, comments and likes/dislikes information are storaged on an SQLite database in the backend.

## Front-end deploy:
https://labeddit-joaoneiva.surge.sh/

## Back-end deploy:
https://labeddit-backend-joao.onrender.com/

## How to run the front-end project:
The app's front-end is already deployed, but if you want to run the project in your machine, follow these steps:

```bash
# Clone the project's repository:
    git clone https://github.com/ojoaoneiva/labeddit.git

# Enter the front-end paste:
    cd front-end

# Install the app's dependencies:
    npm i

# Run the application:
    npm run start

# The server will start on localhost:3000
```

## How to run the back-end project:
The app's back-end is already deployed, but if you want to run the project in your machine, follow these steps:

```bash
# Clone the project's repository, (if not already done in the front-end instructions):
    git clone https://github.com/ojoaoneiva/labeddit.git

# Enter the back-end paste:
    cd back-end

# Install the app's dependencies:
    npm i

# Run the application in developpement mode:
    npm run dev

# The server will start on localhost:3003
```

## Technologies used:
- Node JS
- Typescript
- Express
- SQLite
- Knex
- UUID
- BcryptJS
- JWT
- ZOD
- POO
- Layred Architecture
- React
- Axios
- React Router
- Styled-components

## Images:

<p align="center">
  <img src="./template/src/assets/Images/github/mobile.jpg" alt="project print screen" width="600">  
  <img src="./template/src/assets/Images/github/1.png" alt="project print screen" width="600">  
  <img src="./template/src/assets/Images/github/2.png" alt="project print screen" width="600">  
  <img src="./template/src/assets/Images/github/3.png" alt="project print screen" width="600">  
</p>

Login

![login](https://github.com/ojoaoneiva/labeddit/assets/122841627/8a25f135-a40a-4425-9427-09e7c0860024)

Sign Up

![signup](https://github.com/ojoaoneiva/labeddit/assets/122841627/79546f4f-48b8-4c57-aa4b-011055b2f65e)

Posts

![home](https://github.com/ojoaoneiva/labeddit/assets/122841627/bb4f37fd-9c20-4063-9a7d-d682cc9220a6)

Comments

![comments](https://github.com/ojoaoneiva/labeddit/assets/122841627/4d34b583-0d42-44d0-b492-5089ea7dfc07)
