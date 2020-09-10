const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const transactionModel = require('../models/transactionModel');

// obter lançamentos de um período
async function getEntries(request, response, next) {
  try {
    const yearMonth = request.query.period;

    if (!yearMonth) {
      throw new Error('Informe o período no formato yyyy-mm.')
    }

    const entries = await transactionModel
      .find({ yearMonth })
      .orFail(new Error(
        `Não foram encontrados lançamentos para o período informado (${yearMonth}).`
      ));

    response.send(entries);
  } catch (error) {
    return next(error);
  }
}

// criar novo lançamento
async function postEntry(request, response, next) {
  try {
    const { description, value, category, date, type } = request.body;
    const [year, month, day] = date.split('-');

    if (!value || !description || !category || !date || !type) {
      throw new Error(
        'Campos obrigatórios não informados ou valor não é maior que 0.'
      );
    }

    const newEntry = {
      description,
      value,
      category,
      type,
      year,
      month,
      day,
      yearMonthDay: date,
      yearMonth: `${year}-${month}`
    };

    const savedEntry = await new transactionModel(newEntry).save();

    response.send(savedEntry);
  } catch (error) {
    return next(error);
  }
}

// editar um lançamento
async function putEntry(request, response, next) {
  try {
    const { id } = request.params;
    const { description, value, category, date, type } = request.body;
    const [year, month, day] = date.split('-');

    if (!value || !description || !category || !date || !type) {
      throw new Error(
        'Campos obrigatórios não informados ou valor não é maior que 0.'
      );
    }

    const newEntry = {
      description,
      value,
      category,
      type,
      year,
      month,
      day,
      yearMonthDay: date,
      yearMonth: `${year}-${month}`
    };

    const savedEntry = await transactionModel
      .findByIdAndUpdate(ObjectId(id), newEntry, { new: true })
      .orFail();

    response.send(savedEntry);
  } catch (error) {
    return next(error);
  }
}

// remover um lançamento
async function deleteEntry(request, response, next) {
  const { id } = request.params;

  try {
    if (!id) {
      throw new Error('Id não informado.');
    }

    await transactionModel
      .findByIdAndDelete(ObjectId(id))
      .orFail();

    response.sendStatus(204);
  } catch (error) {
    return next(error);
  }
}

// tratamento de erros
function errorHandler(error, request, response, _next) {
  console.log(`Error: ${request.method} ${request.baseUrl}${request.url}: ${error.message}`);

  return response.status(400).send({ error: error.message });
}

module.exports = { errorHandler, getEntries, postEntry, deleteEntry, putEntry };