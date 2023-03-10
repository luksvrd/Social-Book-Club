# Over-Booked

This application brings together new technologies and concepts such as Node.js, Express.js, Sequelize, and Handlebars.js to create a full-stack web application that allows users to create a profile, login, make comments, and create posts. The application is a digital book club where users can collaborate and share book reviews and recommendations. In developing this application, we learned to use the MVC paradigm to organize our code, and we learned to use Handlebars.js to create dynamic HTML pages. We also learned to use Sequelize to create and manage our database, and we learned to use Express.js to create a server and handle routing. We implemented the use of packages such as bcrypt, connect-session-sequelize, dotenv, express-handlebars, express-session, and mysql2 to help us create a secure and functional application.

Repository: https://github.com/luksvrd/Social-Book-Club
![Over-Booked](https://github.com/luksvrd/Social-Book-Club/blob/main/OverBooked.jpg)

## Table of Contents

### \* [Description](#description)

### \* [Installation](#installation)

### \* [Usage](#usage)

### \* [Future Development](#Future-Development)

### \* [Questions](#questions)

### \* [Contributing](#contributing)

### \* [License](#license)

## Description

This application brings together new technologies and concepts such as Node.js, Express.js, Sequelize, and Handlebars.js to create a full-stack web application that allows users to create a profile, login, make comments, and create posts. The application is a digital book club where users can collaborate and share book reviews and recommendations. In developing this application, we learned to use the MVC paradigm to organize our code, and we learned to use Handlebars.js to create dynamic HTML pages. We also learned to use Sequelize to create and manage our database, and we learned to use Express.js to create a server and handle routing. We implemented the use of packages such as bcrypt, connect-session-sequelize, dotenv, express-handlebars, express-session, and mysql2 to help us create a secure and functional application.

```
Heroku:

# User Story
AS and avid reader,
I WANT to be able to create a profile, login, and create a personal bookshelf to keep track of books I have read,
SO THAT I can successfully read through my collection of books and track my progress.

As a user, you will be able to:

* Create a profile
* Login
* Create a personal Bookshelf to keep track of books you have read

```

## Installation

- This application assumes you have a 'complete dev environment' setup - a terminal, Node, & VS Code. To get started, Fork the repository and clone the new repo from your Github to your local computer. `cd` into the cloned repo and enter: `npm i`
  The following necessary dependencies must be installed to run the application properly:

- `npm i dotenv`
- `npm i express`
- `npm i express-handlebars`
- `npm i express-session`
- `npm i mysql2`
- `npm i sequelize`
- `npm i bcrypt`
- `npm i connect-session-sequelize`

## Usage

Once you `cd` into the repo, run `npm i` to install all the things. You can then start the server by executing `node server.js`. In order to seed the database, execute `node seeds/seed.js`. Use an app like Insomnia Core to test your CRUD opperations on the database.

## Future Development

Ongoing goals in development include:

- Adding Comments to User's Bookshelves
- Adding Reviews to Books
- User reading lists to keep track of books they want to read

## Questions

If you have any questions about the repo, open an issue at https://github.com/luksvrd?tab=repositories. You can also find more of our work at our respective Github Repositories:

- [Elliot Baynes](https://github.com/eabaynes)
- [Brittany Burton](https://github.com/brittanyb89)
- [Lukas Virden](https://github.com/luksvrd)

## Credits

Thanks to [Manav Misra](https://github.com/manavm1990/node-starter) for the Node.js Starter Template & all his teachings throughout the WUSTL Coding Bootcamp.

## Contributing

Contributors: Lukas Virden, Elliot Baynes, Brittany Burton

## License

License:

- [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
- ![NPM](https://img.shields.io/npm/l/inquirer?style=plastic)
- ![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)
- [![npm collaborators](https://img.shields.io/npm/collaborators/inquirer)](https://www.npmjs.com/package/inquirer)
- [![Dependents (via libraries.io)](https://img.shields.io/librariesio/dependents/npm/inquirer)](https://www.npmjs.com/package/inquirer)
- [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

- [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Copyright (c) 2022 Brittany Burton, Lukas Virden, Elliot Baynes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
