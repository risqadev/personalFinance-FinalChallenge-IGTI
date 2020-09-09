const express = require('express');
const { errorHandler, getEntries, postEntry, deleteEntry, putEntry } = require('../services/transactionService');
const transactionRouter = express.Router();

transactionRouter.get('/', getEntries);

transactionRouter.post('/', postEntry);

transactionRouter.delete('/:id', deleteEntry);

transactionRouter.put('/:id', putEntry);

// tratamento de erros
transactionRouter.use(errorHandler);

module.exports = transactionRouter;
