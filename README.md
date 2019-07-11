# PropertyPro-lite
## Build Status
[![Build Status](https://travis-ci.com/prieste/PropertyPro-lite.svg?branch=master)](https://travis-ci.com/prieste/PropertyPro-lite)
[![Coverage Status](https://coveralls.io/repos/github/prieste/PropertyPro-lite/badge.svg)](https://coveralls.io/github/prieste/PropertyPro-lite)
[![Maintainability](https://api.codeclimate.com/v1/badges/3c89d7225a973f345f52/maintainability)](https://codeclimate.com/github/prieste/PropertyPro-lite/maintainability)
### A platform where you can create and/or search for properties for sale.

    
### Implemented Features
- Users can sign up
- Users can sign in
- Users(agent) can post ad
- Users(agent) can update ad
- Users(agent) can mark ad as sold
- Users(agent) can delete ad
- User can view all ads
- User can view ads by type
- User can reset password
- User can flag ad as fraudulent

### Project Management
Project is managed here using the project management tool, 
[Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2354202).

### Technologies Used
Node.js - A runtime environment based off of Chrome's V8 Engine for writing Javascript code on the server.
Express.js - Web framework based on Node.js.
Babel - Javascript transpiler.
Eslint - Javascript linter.
Airbnb style guide was followed.

### Testing tools
Mocha - A Javascript test framework.
Chai - Assertion library.
nyc - Istanbul's command line interface.
[API Infomormation](https://ppl-best.herokuapp.com/docs/).

### How to install and checkout the app locally
Installation
Install NodeJs .
Clone this repository using git clone https://github.com/prieste/PropertyPro-lite.git
Run npm install to install all dependencies.
Run npm start to start the server.
Navigate to localhost:3000 in your browser to access the application.

### Testing the application
#### Requirements
Postman - API development and testing environment.

#### Testing with Postman
Install Postman by following the link above.
Navigate to localhost:3000 in Postman to access the application(Check api information above for routes).

#### Running unit tests.
In an open terminal, navigate to the cloned project directory.
Run npm test. This runs tests and displays coverage data generated by Istanbul's nyc.

### Author
Chubi Best
