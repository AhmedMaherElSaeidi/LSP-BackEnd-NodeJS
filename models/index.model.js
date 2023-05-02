// CONVERT MODELS TO TABLES USING SEQUELIZE ORM

const Sequelize = require("sequelize");
const db = require("../config/database.config");

// import (models functions)
const UserModel = require("./User.model");
const BookModel = require("./Book.model");
const BorrowModel = require("./Borrow.model");

// convert models to tables (calling models functions)
const User = UserModel(db, Sequelize);
const Book = BookModel(db, Sequelize);
const Borrow = BorrowModel(db, Sequelize);

// one to many (user and book tables)
User.hasMany(Book, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: 'user_id',
});
Book.belongsTo(User, {foreignKey: 'user_id'});

// one to many (user and borrow tables)
User.hasMany(Borrow, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: 'user_id',
});
Borrow.belongsTo(User, {foreignKey: 'user_id'});

// one to many (book and borrow tables)
Book.hasMany(Borrow, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: 'book_id',
});
Borrow.belongsTo(Book, {foreignKey: 'book_id'});

// convert models to tables
// force:false => if tables are not created, create these tables
// make force:true => when you need to drop this schema and build it again
db.sync({ force: false }).then(() => {
  console.log("Tables Created!");
});

// expoert tables
module.exports = {
  User,
  Book,
  Borrow,
};
