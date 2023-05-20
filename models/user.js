const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    cart : {
        items : [{ 
            productId : {
                type : Schema.Types.ObjectId, 
                required : true,
                ref : 'Product'
            }, 
            quantity : { 
                type : Number, 
                required : true 
            }
        }]
    }
})

module.exports = mongoose.model('User', userSchema)

// const mongodb = require('mongodb')
// const getDb = require("../util/database").getDb;

// const ObjectId = mongodb.ObjectId

// class User{
//   constructor(name, email, cart, id){
//     this.name = name;
//     this.email = email;
//     this.cart = cart; //{ items : []}
//     this._id = id;
//   }

//   save(){
//     const db = getDb();
//     return db.collection("users").insertOne(this)
//     .then(result => {
//       return result
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   }

//   static findById(userId){
//     const db = getDb()
//     return db.collection('users').findOne ({ _id :new ObjectId(userId)})
//     .then(result => {
//       return result
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   }

//   addToCart(product){
//     const cartProductIndex = this.cart.items.findIndex(cp => {
//       return cp.productId.toString() === product._id.toString()
//     })

//     let newQuantity = 1;
//     let updatedCartItems = [...this.cart.items]

//     if(cartProductIndex >= 0){
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1
//       updatedCartItems[cartProductIndex].quantity = newQuantity
//     }else{
//       updatedCartItems.push({ productId : new ObjectId(product._id), quantity : newQuantity })
//     }
//     const updatedCart = { items : updatedCartItems }
//     const db = getDb();
//     return db.collection('users').updateOne({ _id : new ObjectId(this._id) }, { $set : { cart : updatedCart } })
//   }  

//   getCart(){
//     const db = getDb();
//     const productIds = this.cart.items.map(product => {
//       return product.productId 
//     })
//     return db.collection('products').find({ _id : { $in :productIds }})
//     .toArray()
//     .then(products => {
//       return products.map(p => {
//         return {
//           ...p,
//           quantity : this.cart.items.find(i => {
//             return i.productId.toString() === p._id.toString()
//         }).quantity
//         };
//       })
//     })
//     .then(result => {
//       console.log(result);
//       return result
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   }

//   deleteItemFromCart(productId){
//     const db = getDb();
//     const updatedCartItems = this.cart.items.filter(cp => {
//       return cp.productId.toString() != productId
//     });
//     return db.collection('users').updateOne({ _id : new ObjectId(this._id)}, { $set : { cart : { items : updatedCartItems } } })
//     .then(result => {
//       console.log(result);
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   }

//   addOrder(){
//     const db = getDb()
//     return this.getCart()
//     .then(products => {
//       let order = {
//         items : products,
//         user : {
//           _id : new ObjectId(this._id),
//           name : this.name
//         }
//       }
//       return db.collection('orders').insertOne(order);
//     })
//     .then((result) => {
//       this.cart = { items : [] }
//       return db.collection('users')
//       .updateOne({ _id : new ObjectId(this._id)}, { $set : { cart : { items : [] } } }) 
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   }

//   getOrders(){
//     const db = getDb();
//     return db.collection('orders').find({ "user._id" : new ObjectId(this._id) })
//     .toArray()
//     .then(orders => {
//       // console.log(orders);
//       return orders
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   }

// }

// module.exports = User;
