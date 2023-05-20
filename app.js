const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose')

// const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
 
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById("6464809fc4d4785c44fbe8c6")
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       // console.log(user);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect('mongodb+srv://vishalmerugu:Vishal%40360@cluster0.ga5b5mf.mongodb.net/shop?retryWrites=true')
  .then(() => {
    app.listen(3000)
    console.log("Server Connected to PORT 3000");
  })
  .catch(err => {
    console.log(err);
  })

