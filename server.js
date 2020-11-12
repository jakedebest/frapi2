const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'password',
      database : 'smartbrain'
    }
});

const register = require('./facerecog/controllers/register.js');
const signin = require('./facerecog/controllers/signin.js');
const profile = require('./facerecog/controllers/profile.js');
const image = require('./facerecog/controllers/image.js');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());




app.get('/', (req, res) => {
    res.send(database.users);
})



app.post('/signin', (req, res) => { signin.handleSignIn(req, res, knex, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt )}) // same as above. handleRegister function runs, then req res gets called

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, knex)})

app.put('/image', (req, res) => { image.handleImage(req, res, knex)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})



    // let found = false;

    // database.users.forEach(user => {
    //     found = true;
    //     if (user.id === id) {
    //         user.entries++;
    //         return res.json(user.entries);
    //     } 
    // })
    // if (!found) {
    //     res.status(400).json('not found');
    // }



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });



app.listen(3000, () => {
    console.log('app running on 3000');
})

/* 

Instead of res.send we are using res.json

/--> res = this is working
/signIn --> POST request, because we are sending sign in info and we want to send in the body securely, not query at top of URL etc., res  with success/fail.
/register --> POST, respond with new user object
/profile/:userID --> GET - respond with user
/image --> PUT - UPDATING (put usually ?) the user profiles score

*/