const mongoose = require('mongoose');

let schema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    validate: {
      validator: (v) => v > 0,
      message: 'Valor deve ser maior que 0.'
    },
    required: true
  },
  category: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    min: 1,
    max: 12,
    required: true
  },
  day: {
    type: Number,
    min: 1,
    max: 31,
    required: true
  },
  yearMonth: {
    type: String,
    required: true
  },
  yearMonthDay: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['+', '-'],
    required: true
  },
});

const transactionModel = mongoose.model('transaction', schema);

module.exports = transactionModel;
