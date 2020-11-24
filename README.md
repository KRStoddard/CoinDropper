## CoinDropper

## Description

This is a game in which the user tries to catch coins to gain points. It uses a Rails API backend and a Javascript frontend.

## Running the webapp

Please run bundle install, rake db:create, and rake db:migrate. Then you can start the server using rails s -p 3001.

In a seperate terminal, run npm install and then open index.html. 


## Project Requirements

** Must be a HTML/CSS/JS frontend with a Rails API backend. All interactions between the client and the server should be handled asynchronously (AJAX) and use JSON as the communication format.

** Backend must render a resource with at least one has-many relationship. For example, if we were building Instagram, we might display a list of photos with associated comments.

** The backend and frontend must collaborate to demonstrate Read AND Create for at least two of your models. Additionally, you'll need either Update or Delete for at least two models. The results of each action should be diplayed to the user without a page refresh.

** Your entire app must run on a single page. There should be NO redirects. In other words, your project will contain a single HTML file.
