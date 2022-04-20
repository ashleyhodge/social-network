# Social Network API Challenge

This is a project for Module 18: NoSQL of the Vanderbilt Coding Boot Camp.

## Table of Contents
- [Social Network API Challenge](#social-network-api-challenge)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Description](#description)
  - [Installation](#installation)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Links](#links)

## Technologies Used
- Express
- Mongoose
- MongoDB
  
## Description
This is the backend of a social media application that lets a user create an account using their email and username, share thoughts, react to thoughts, and become friends with each other.

## Installation
Before using this application please follow these steps:
1. Run `npm init --y`
2. Run `npm i express mongoose`
3. Run `npm start`

Once the serve has been started you should see something similar to this in you terminal:
```
> social-network@1.0.0 start
> node server.js

🌍 Connected on http://localhost:3001/
Mongoose: users.createIndex({ username: 1 }, { unique: true, background: true })
Mongoose: users.createIndex({ email: 1 }, { unique: true, background: true })
```
If you have any question please contact <ashhodge@comcast.net> 
## Acceptance Criteria
```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```
## Links
- [GitHub Repository](https://github.com/ashleyhodge/social-network)
- [Walkthrough Video]()
