const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./controllers/error');
const User = require('./models/user')


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
 
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("646894c7b212321465d282ec")
    .then(user => {
      req.user = user;
      // console.log(user);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect('mongodb+srv://vishalmerugu:Vishal%40360@cluster0.ga5b5mf.mongodb.net/shop?retryWrites=true')
  .then(() => {
    User.findOne()
      .then((user) => {
        if(!user){
          const user = new User({
            name : "vishal",
            email : "babu@gmail.com",
            cart : {
              items : []
            }
          })
          return user.save()
        }
      })
      .then(() => {
        app.listen(3000)
        console.log("Server Connected to PORT 3000");
      })
  })
  .catch(err => {
    console.log(err);
  })

