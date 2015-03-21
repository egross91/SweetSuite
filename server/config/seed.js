/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');

//Thing.find({}).remove(function() {
  //Thing.create({
  //  name : 'Clean mah room!',
  //  info : 'No one has touched it in a while. I need the workzzz.'
  //}, {
  //  name : 'Le Kitchen',
  //  info : 'We had a party last night, and that should be self explanatory...'
  //}, {
  //  name : 'All the trash cans',
  //  info : 'With a rager comes a lot of trash, ya know?'
  //}, {
  //  name : 'Modular Structure',
  //  info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  //},  {
  //  name : 'Optimized Build',
  //  info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  //},{
  //  name : 'Deployment Ready',
  //  info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
//  );
//});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    lists: [
            {title: 'House',
             todos: [{name: 'The Lawn', info: 'There\'s garbage all over the lawn that needs to be picked up.', priority: 3},
                     {name: 'The Trash', info: 'Please place the recyclables in the green can outside. Place the rest of the garbage in the black can.', priority: 3},
                     {name: 'The Kitchen', info: 'All food left out needs to be disposed off. There are a few dishes that need to be washed.', priority: 1}]
            },
            {title: 'Guest House',
             todos: [{name: 'Bedrooms', info : 'All beds need to be made. Carpets in all bedrooms must be vacuumed', priority: 2}]
    }]
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
