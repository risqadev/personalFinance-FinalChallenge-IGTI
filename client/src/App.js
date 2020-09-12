import React, { useState, useEffect, useRef } from 'react';
import api from './services/api';
import Selector from './components/Selector';
import DisplayLine from './components/DisplayLine';
import ActionsLine from './components/ActionsLine';
import EntriesList from './components/EntriesList';

export default function App() {
  // console.log('App() excope');

  const [currentPeriod, setCurrentPeriod] = useState('2020-09');
  const [periodEntries, setPeriodEntries] = useState([]);
  const [allPeriods, setAllPeriods] = useState(['2020-09']);

  const [isEditing, setIsEditing] = useState(false);

  const countEntries = useRef(0);
  const incomeSum = useRef(0);
  const expensesSum = useRef(0);
  // const balance = useRef(0);

  const handleChangeSelector = (selected) => {
    setCurrentPeriod(selected);
  }

  const handleItemAction = (action, id) => {
    action === 'edit' && editItem(id);
    action === 'delete' && deleteItem(id);
  }

  const editItem = (id) => {
    console.log('editItem', id);
  }

  const deleteItem = async (id) => {
    try {
      await api.delete(`transaction/${id}`);

      const cleanedEntries = periodEntries.filter(({ _id }) => _id !== id);

      setPeriodEntries([...cleanedEntries]);
    } catch (error) {
      console.log(error.message);
    }
  }

  const calculateInfos = () => {
    // console.log('calculeteInfos() excope');

    countEntries.current = periodEntries.length;

    incomeSum.current = periodEntries
      .filter(({ type }) => type === '+')
      .reduce((accumullator, { value }) => accumullator += value, 0);

    expensesSum.current = periodEntries
      .filter(({ type }) => type === '-')
      .reduce((accumullator, { value }) => accumullator += value, 0);

    // balance.current = incomeSum.current - expensesSum.current;
  };
  calculateInfos();
  // useEffect(calculateInfos, [periodEntries]);

  useEffect(() => {
    const getPeriodEntries = async () => {
      const { data: { entries, periods } } = await api.get(`transaction/?period=${currentPeriod}`);

      entries.sort((item, next) => item.day - next.day);

      setPeriodEntries([...entries]);
      setAllPeriods([...periods]);
    };

    getPeriodEntries();
  }, [currentPeriod]);

  return (
    <div className="container">
      <h2 className="center">Desafio Final do Bootcamp Full Stack</h2>
      <h1 className="center">Gerenciador Financeiro Pessoal</h1>

      <Selector
        selectedItem={currentPeriod}
        items={allPeriods}
        onChange={handleChangeSelector}
      />

      <DisplayLine
        countEntries={countEntries.current}
        income={incomeSum.current}
        expenses={expensesSum.current}
      />

      <ActionsLine />

      <EntriesList
        items={periodEntries}
        returnAction={handleItemAction}
      />

    </div>
  );
}
