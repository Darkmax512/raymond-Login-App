# Website Title

**Login-Test-Application**

# Table of Contents

- [Introduction](#introduction).
- [Description](#description).
- [Used Technologies](#used-technologies).
- [Installation](#installation).

### Introduction

This website is made for testing Login 2FA and Email verify Functionalty.

### Description

### Used Technologies

- React.js Framwork, redux, axios.
- Node.js and Express.js for back-end.
- JWT _Jason Web Token_ for Authentication.

### Installation

To run this project, simply install it locally using NPM:
before you running if you wanna run it localy in dev mode the mean to run client and server
on there own ports
cd client/src/helpers/
in axiosInstance.js please change baseURL = http://localhost:5000/api/v1/

```
$ cd client && npm start
$ cd server && npm run dev or npm start

else if you running it for production do this iin the main folder.

```

$ npm run build
$ npm start

```

### .env schema

- MONGO_URI = mongoDb uri
- JWT_SECRET = any secret for JWT
- Expire_Date = expire date for jwt token per min.
- BASE_URL = base frontEnd url for Email
- MAIL_HOST= smtp-host
- MAIL_PORT= mail port
- MAIL_USER= mail app user
- MAIL_PASS= mail app password

```
