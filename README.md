# musiclist
// Install / update express-generator globally
yarn global add express-generator

// Run express on musiclist
cd.. // since I'm within musiclist
express -v ejs -f musiclist
cd .\musiclist\ // enter the musiclist folder
yarn

// Run server
yarn start
// Navigate to localhost:3000; This runs a script in ./bin/www;

// Create separate git branch
git branch develop
// list branches - *asterisk is active
git branch
// switch active branch
git checkout develop
// push new branch upstream (ie saves branch) to github; origin is a autogenerate url for the repo (ie shortcut);
git push -u origin develop
// run as many commits you logically want with appropriate messages; at the end of the day, push your changes to github;

// run "yarn" any time to add any new packages in package.json to the project; it won't redownload or effect any existing packages;

// setup passport

// test with user (not recommended for production due security flaw - ie unencrypted password)
/// open mongo via cmd
mongo
/// switch to musiclist
use musiclist
/// create user
db.users.insert({ "username": "someone", "password": "unencrypted pass", "firstName": "who", "lastName": "ami", "email":"woot@u.com" });
/// find and display users
db.users.find().pretty();

// mongoose model is automatically connected to its plural (ie house model to houses); This can be overridden;

// DRY = Do not repeat yourself; like with many things in life, theres a balance;

// clear everything within a mongo database
// switch to database
use musiclist
// clear db
db.users.remove({})


// Process to login
1. User fills in form and clicks login button (or hits enter)
2. Tell app state an event is occurring
3. Form validation: front-end
4. Form validation: back-end
5. Log user in
6. Update app state with user info
7. Tell app state an event has finished occurring

Step 2 and 7 control the start and end of the login in process and ajax spinner. Ajax spinner symbolizes the app is logging. Usually, the spinner would appear and disappear very fast, except in certain cases like slow internet.

redux
Event occurs (ie. a click); Action Handler for that event (a function you write yourself and embed using an onClick in your JSX code) dispatches what Redux calls an “action” … the thing with actions is that they’re not functional. They are an object that contains information. Redux reads this information and, if your action matches its list of actions it’s watching for (more on this later), updates the Store accordingly. The Store is, as we’ve discussed, React’s name for the state of your application.

actions - javascript object with a description and incoming data
reducers - reduce actions for store???

look into thunk, saga, and mint for redux

# Switching to postgresql - better performance and stability compared to mongo

// Install postgresql (on windows) - https://stackoverflow.com/questions/45720897/setup-postgressql-9-6-in-windows-10-x64-bigsql-graphical-installer

// Create db
createdb stasks2

// install knex to handle migrations and seek data (instructor installed globally but I don't like installing things globally - as far as possible)
yarn add knex

// initialize knex and edit knexfile
yarn knex init

// install pg driver
yarn add pg

//--***Migration file - sending model layout to db - see more at
//-- http://perkframework.com/v1/guides/database-migrations-knex.html
// create a user migration file
yarn knex migrate:make migration_file_name
ie. yarn knex migrate:make users

// edit user migration code to match your model

// migrate the changes - this only can be run once per migration
// for a new migration of the same table, create a new migration file
yarn knex migrate:latest

// for more knex options
yarn knex

// install bookshelf - an ORM that uses knex that can help with db use like saves user into database
yarn add bookshelf

// create src/server/bookshelf.js and add code

// install bcrypt - use to encode any user passwords
yarn add bcrypt

// only run this if a warning stating console code page (437) differs from Windows code page (1252)... ; Run this in cmd and it will give a success message "Active code page: 1252" and no warning in psql
cmd.exe /c chcp 1252 

// to view a new user created by register run the following
psql stasks2
\x auto  //-- pretty psql rendering
select * from users;

