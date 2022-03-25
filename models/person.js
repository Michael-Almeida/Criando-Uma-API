//É o objeto no BD.

const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
  name: String,
  salary: Number,
  approved: Boolean,
});

module.exports = Person;
