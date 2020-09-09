const express = require('express');
const { getTransactions, errorHandler } = require('../services/transactionService');
const transactionRouter = express.Router();

transactionRouter.get('/', getTransactions);

// tratamento de erros
transactionRouter.use(errorHandler);

module.exports = transactionRouter;
