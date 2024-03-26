const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const register_filmmaker = require('./controllers/register_filmmaker');
const updateFilmmaker = require('./controllers/updateFilmmaker');
const like = require('./controllers/like');
const topFilmmakers = require('./controllers/topFilmmakers');






const app = express();
app.use(cors())
app.use(bodyParser.json());

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'asd',
    database : 'jana'
  }
});

db.select('*').from('users').then(data=>console.log(data))


app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.post('/register_filmmaker', (req, res) => { register_filmmaker.handleRegisterFilmmaker(req, res, db) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.get('/topFilmmakers', (req, res) => { topFilmmakers.handleTopFilmmakers(req, res, db) })
app.post('/like', (req, res) => { like.handleLike(req, res, db)})


app.listen(3000,()=>{
	console.log('heeeey')
})