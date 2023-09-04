# [Labeddit](https://labeddit-joaoneiva.surge.sh/)

Go to the API Docummentation [here](https://documenter.getpostman.com/view/27685475/2s9Y5eMeZG)

[Front-end repository](https://github.com/ojoaoneiva/labeddit/tree/main/front-end)

[Back-end repository](https://github.com/ojoaoneiva/labeddit/tree/main/back-end)

## About:
The "Labeddit" project aims to build a fullstack website, with a frontend of a small social media plataform and its backend applicaction that builds an API with data source for users, posts, post's comments and likes. The front-end is mobile-first and consists on three pages: Home, login and signup, following the design provided by Figma.

---

## Functionalities:
  - [x]   <strong>Login Page:</strong> The user can connect (if the user and email are valid and previously created) and the app will autenticat the data, and generate an acess token and go to the Feed page.
- [x]  Sign up Page: The user can creat an account (with email that haven't been used before), and the app will generate an acess token and go to the Feed page.
- [x]  Feed page: Only authorized to be seen if a valid user is logged and the JWT token. The page shows all the posts created by all users.
- [x]  Like or dislike: The user can like or dislike a post or a comment.
- [x]  Create post or comment: The user can create on the textfield a new post, or can comment on an existing post.
- [x]  Layered Architecture: The app's structure was built and organized with layered architecture to make the code more organized and for its reusability, maintainability and scalability.
- [x]  Frontend + Api: Integration with the backend API, using React, axios and endpoints that receives data, based on the API's documentation.
- [x]  React Router: Navigation between pages with React Router.
- [x]  Hashed passwords: All the passwords are hashed using BcryptJS before its storage on the databse, so the information is protected.
- [x]  Database: All the users, posts, comments and likes/dislikes information are storaged on an SQLite database in the backend.
---

## Deploy:
https://labeddit-joaoneiva.surge.sh/

## How to run the front-end project:
The app is already deployed, but if you want to run the project in your machine, follow these steps:

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
The app is already deployed, but if you want to run the project in your machine, follow these steps:

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
---

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
- React
- Axios
- React Router
- Styled-components
---

## Images:

Login

![login](https://github.com/ojoaoneiva/labeddit/assets/122841627/8a25f135-a40a-4425-9427-09e7c0860024)

Sign Up

![signup](https://github.com/ojoaoneiva/labeddit/assets/122841627/79546f4f-48b8-4c57-aa4b-011055b2f65e)

Posts

![home](https://github.com/ojoaoneiva/labeddit/assets/122841627/bb4f37fd-9c20-4063-9a7d-d682cc9220a6)

Comments

![comments](https://github.com/ojoaoneiva/labeddit/assets/122841627/4d34b583-0d42-44d0-b492-5089ea7dfc07)
