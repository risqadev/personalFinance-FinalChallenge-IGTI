const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

async function getTransactions(request, response, next) {
  const yearMonth = request.query.period;

  try {
    const transactions = await TransactionModel.find({ yearMonth });

    // console.log(transactions);

    response.send(transactions);

  } catch (error) {
    return next(error);
  }
}

/* function getAllTransactions(request, response, next) {
  try {
    throw new Error('Teste');
  } catch (error) {
    return next(error);
  }
} */

// tratamento de erros
function errorHandler(error, request, response, _next) {
  console.log(`Error: ${request.method} ${request.baseUrl}${request.url}: ${error.message}`);

  return response.status(400).send({ error: error.message });
}

module.exports = { errorHandler, getTransactions };