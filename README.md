# epa-project

## Before Installing
You will need PHP 7.4 and MySQL for this to work. You will also need to import the `player_database.sql` file into a new database.
You will also need Node.js 12 as well as the ionic cli installed globally. `npm i -g @ionic/cli`
I hosted the `player-backend` application via a local version of apache. This should work using `php artisan serve` too however I haven't personally tested this. You will also need to change the 'apiUrl' value in `player-frontend/src/environments/environment.ts` and `player-frontend/src/environments/environment.prod.ts` to the address artisan hosts on.

## Install
First, cd into the `player-backend` directory and change the database credentials in the `.env` file to match your newly imported database.
Second, run `composer install` to install the packages required.

To display the front end application, cd into the `player-frontend` directory and run `npm install` to install all dependencies. Once this has completed, run `ionic serve`. This will compile the app and run a development version in your browser.
