import React from 'react';
import M from "materialize-css";
import Button from './Button';
import 'materialize-css/dist/css/materialize.min.css';

export default function Form({ onSubmit, isEditing }) {
  React.useEffect(() => {
    M.AutoInit();
  }, [])

  // console.log(isEditing);

  const [entry, setEntry] = React.useState({
    ...isEditing.entry,
    date: isEditing.entry.yearMonthDay || isEditing.entry.date
  });

  // console.log(entry);

  const handleInputChange = ({ currentTarget: { name, value } }) => {
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

      // setEntry({
      //   type: '-',
      //   date: '2020-09-13'
      // });
    } catch (error) {
      alertElement.innerText = error.message;
    }
  }

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              value="+"
              name="type"
              id="typeIncome"
              type="radio"
              checked={entry.type === '+'}
              onChange={handleInputChange} />
            <span>
              Receita
          </span>
          </label>
          <label>
            <input
              value="-"
              name="type"
              id="typeExpense"
              type="radio"
              checked={entry.type === '-'}
              onChange={handleInputChange} />
            <span>
              Despesa
          </span>
          </label>
        </div>

        <div>
          <div /* className="input-field" */>
            <label htmlFor="description">Descrição</label>
            <input
              value={entry.description || ""}
              name="description"
              id="description"
              type="text"
              onChange={handleInputChange} />
          </div>

          <div /* className="input-field" */>
            <label htmlFor="category">Categoria</label>
            <input
              value={entry.category || ""}
              name="category"
              type="text"
              id="category"
              onChange={handleInputChange} />
          </div>

          <div className="row">
            <div /* className="input-field col s6" */>
              <label htmlFor="value">Valor</label>
              <input
                value={entry.value || ""}
                name="value"
                type="number"
                id="value"
                onChange={handleInputChange}
              />
            </div>

            <div /* className="input-field col s6" */>
              <label htmlFor="date">Data</label>
              <input
                value={entry.date}
                name="date"
                id="date"
                type="date"
                onChange={handleInputChange}
              />
            </div>
          </div>

        </div>

        <Button
          // className="modal-close"
          onClick={handleSubmit}
        >
          Salvar
        </Button>

      </form>

      <div className="modal-footer">
        <p id="alert" style={{ color: 'red' }}></p>
      </div>

    </div>
  )
}
