const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost:27017/contactGrow');
const port = 8001;

var myContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String
});

var contact = mongoose.model('contact', myContactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());



//PUG SPECIFIC STUFF
app.set('views engine', 'views');
app.set('views', path.join(__dirname, 'views'));


//ENDPOINTES
app.get('/', (req, res)=>{
    res.status(200).render('home.pug');
})

app.get('/about', (req, res)=>{
    res.status(200).render('about.pug');
})

app.post('/', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("your details has been saved")
    }).catch(()=>{
        res.status(404).send("details was not saved")
    });
})


// SERVER START
app.listen(port, ()=>{
    console.log(`Our server start on port ${port}`);
})
