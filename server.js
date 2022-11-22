const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const fetch = require('node-fetch');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const imageurl = require('./controllers/image');



const db = knex({
    client: 'pg',
    connection: {
        host: 'containers-us-west-123.railway.app',
        port: 6253,
        user: 'postgres',
        password: process.env.PGPASSWORD,
        database: 'railway'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send(`I am working! Hola Mundo `) })
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });

app.put("/image", (req, res) => { (image.handleImage(req, res, db)) });
app.post("/imageurl", (req, res) => { (image.handleApiCall(req, res,)) });


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});









