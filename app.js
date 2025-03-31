const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User.js');

app.use(express.static('public'));
app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true }));



mongoose.connect('mongodb://localhost:27017/myDb')
  .then(() => console.log('Connected!'));

// Start the server
app.listen(3000,()=>{
    console.log("LocalHost is running ....");
})


// Define the / route
app.get('/', (req, res) => {
    res.redirect("/dti.html");
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, " " , password);
    const user = new User(req.body);
    await user.save()
        .then(() => res.send('User saved'))
        .catch(err => res.status(400).send(err.message));
});