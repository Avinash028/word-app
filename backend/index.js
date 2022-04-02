var express = require('express');
const mongoose = require('mongoose');
const Word = require('./models/word');
require('dotenv').config()


var app = express();
app.use(express.json())
var cors = require('cors');

app.use(cors());

const port = process.env.PORT || 5000;

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fjxwl.mongodb.net/wordDB?retryWrites=true&w=majority`;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => {
        console.log("connected to DB");
        app.listen(port, function () {   
            console.log("Server listening on port", port)
         })
    })
    .catch(err => {console.log(err);})


app.post('/word', function (req, res) {
    const word = new Word({
        word: req.body.word
    });

    word.save()
      .then(result => {
        console.log(result);
        res.send(result)
      })
      .catch(err => {
          console.log(err);
      })

    //console.log(req.body)
})

app.get('/all-words', function (req, res) {
    Word.find()
      .then(result => {
          res.send(result)
      })
      .catch(err => {
          console.log(err);
      })
 })

 app.post('/delete', function (req, res) {
     var id = req.body._id;
    Word.findByIdAndDelete(id, (err, doc) => {

        if (!err) {
            console.log("Deleted");
            res.send("deleted");
        } else {
            console.log('Failed to Delete user Details: ' + err);
        }
 })
 });

 app.post('/update', function (req, res) {
    var id = req.body._id;
   Word.findByIdAndUpdate(id, {word: req.body.word}, (err, doc) => {

       if (!err) {
           console.log("Updated");
           res.send("deleted");
       } else {
           console.log('Failed to Delete user Details: ' + err);
       }
})
});

