# Bluuit - A Reddit clone written in Angular
Bluuit mirrors a certain amount of Reddit functionality - you can register, login, create new posts and topics, and vote on existing posts.

<img src="https://github.com/jcquery/bluuit/raw/master/screenshots/searchdemo.gif" height="250">

## Technologies, etc.
The front-end was built in Angular using a certain amount of Materialize (which ended up being a mistake). The back end is an ExpressJS server with a PostgreSQL database.

<img src="https://github.com/jcquery/bluuit/raw/master/screenshots/topicdemo.gif" height="250">

## Don't use Materialize with Angular
Not just because it requires bringing in jQuery for limited benefit. Materialize's rendering process and Angular's digest cycle don't always play nicely together, and ensuring that the different elements would update appropirately required more fiddling than it should have. There's actually a Material Design library for Angular that, in hindsight, would have been a much better idea.
