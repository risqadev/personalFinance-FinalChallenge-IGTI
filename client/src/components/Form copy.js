import React from 'react';
import Button from './Button';
import Input from './Input';

export default function Form({ onSubmit, isEditing }) {

  const [entry, setEntry] = React.useState({
    ...isEditing.entry,
    date: isEditing.entry.yearMonthDay || isEditing.entry.date
  });

  // console.log(entry);

  const handleInputChange = ({ target: { name, value } }) => {
    setEntry({
      ...entry,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const alertElement = document.querySelector('#alert')
    alertElement.innerText = '';

    try {
      const { type, date, description, value, category } = entry;

      if (!type || !date || !description || !value || !category) {
        throw new Error('Preencha todos os campos.')
      }

      onSubmit(entry);

    } catch (error) {
      alertElement.innerText = error.message;
    }
  }

  return (
    <div>

      <form onSubmit={handleSubmit}>

        <div className="row">
          <Input
            label="Receita"
            name="type"
            value="+"
            id="typeIncome"
            type="radio"
            classLabel="col s12 m12 l6 center"
            checked={entry.type === '+'}
            onChange={handleInputChange}
          />

          <Input
            label="Despesa"
            name="type"
            value="-"
            id="typeExpense"
            type="radio"
            classLabel="col s12 m12 l6 center"
            checked={entry.type === '-'}
            onChange={handleInputChange}
          />

        </div>



        <div className="row">

          <Input
            label="Descrição"
            name="description"
            value={entry.description || ""}
            type="text"
            classContainer="col s12 input-field"
            classLabel={(isEditing.status === true && 'active') || ''}
            onChange={handleInputChange}
          />

        </div>

        <div className="row">
          {/* <label className="col s12 m12 l6 center">
            <input
              value="+"
              name="type"
              id="typeIncome"
              type="radio"
              checked={entry.type === '+'}
              onChange={handleInputChange} />
            <span className="_type-radio">
              Receita
            </span>
          </label>
          <label className="col s12 m12 l6 center">
            <input
              value="-"
              name="type"
              id="typeExpense"
              type="radio"
              checked={entry.type === '-'}
              onChange={handleInputChange}
            />
            <span className="_type-radio">
              Despesa
          </span>
          </label> */}

          <div>
            {/* <div className="col s12 input-field">
              <label
                className={(isEditing.status === true && 'active') || ''}
                htmlFor="description"
              >
                Descrição
            </label>

              <input
                value={entry.description || ""}
                name="description"
                id="description"
                type="text"
                onChange={handleInputChange}
              />
            </div> */}

            <div className="col s12 input-field">
              <label
                className={(isEditing.status === true && 'active') || ''}
                htmlFor="category"
              >
                Categoria
              </label>

              <input
                value={entry.category || ""}
                name="category"
                type="text"
                id="category"
                onChange={handleInputChange}
              />

            </div>


            <div className="col s12 m12 l6 input-field">
              <label
                className={(isEditing.status === true && 'active') || ''}
                htmlFor="value"
              >
                Valor
              </label>

              <input
                value={entry.value || ""}
                name="value"
                type="number"
                id="value"
                min="0"
                step="0.01"
                onChange={handleInputChange}
              />
            </div>

            <div className="col s12 m12 l6 input-field">
              <label
                className="active"
                htmlFor="date"
              >
                Data
              </label>
              <input
                value={entry.date}
                name="date"
                id="date"
                type="date"
                onChange={handleInputChange}
              />

            </div>

          </div>
          <div className="col s12">
            <Button
              className="btn waves-effect waves-teal right"
              onClick={handleSubmit}
            >
              Salvar
            </Button>

          </div>

        </div>
      </form>

      <div className="modal-footer">
        <p id="alert" style={{ color: 'red' }}></p>
      </div>

    </div>
  )
}
