import React, { useState, useEffect, useRef } from 'react';
import api from './services/api';
import Selector from './components/Selector';
import DisplayLine from './components/DisplayLine';

export default function App() {

  const [currentPeriod, setCurrentPeriod] = useState('2020-09');
  const [periodEntries, setPeriodEntries] = useState([]);
  const [allPeriods, setAllPeriods] = useState(['2020-09', '2020-10', '2020-11']);

  const countEntries = useRef(0);
  const incomeSum = useRef(0);
  const expensesSum = useRef(0);
  // const balance = useRef(0);

  const handleChangeSelector = (selection) => {
    // console.log(newPeriod);
    setCurrentPeriod(selection);
  }

  const getPeriodEntries = () => {
    console.log('API.get');
    api.get(`transaction?period=${currentPeriod}`)
      .then(response => {
        setPeriodEntries(response.data);
        // console.log(response.data);
      })
  }

  const calculateInfos = () => {
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

  useEffect(
    getPeriodEntries,
    [currentPeriod]
  );

  // useEffect(() => {
  //   console.log(countCurrentEntries.current);
  // }, [periodEntries]);


  return (
    <div className="container">
      <h2 className="center">Desafio Final do Bootcamp Full Stack</h2>
      <h1 className="center">Gerenciador Financeiro Pessoal</h1>

      <Selector
        currentItem={currentPeriod}
        allItens={allPeriods}
        onChange={handleChangeSelector}
      />

      <DisplayLine
        countEntries={countEntries.current}
        income={incomeSum.current}
        expenses={expensesSum.current}
      />

    </div>
  );
}
