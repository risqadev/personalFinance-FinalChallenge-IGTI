import React, { useState, useEffect, useRef } from 'react';
import InfoField from './components/InfoField';
import Selector from './components/Selector';
import api from './services/api';

export default function App() {

  const [currentPeriod, setCurrentPeriod] = useState('2020-09');
  const [periodEntries, setPeriodEntries] = useState([]);
  const [allPeriods, setAllPeriods] = useState(['2020-09', '2020-10', '2020-11']);

  const countCurrentEntries = useRef(0);
  const sumCurrentIncome = useRef(0);
  const sumCurrentExpenses = useRef(0);
  const sumCurrentBalance = useRef(0);

  const handleChangeSelector = (selection) => {
    // console.log(newPeriod);
    setCurrentPeriod(selection);
  }

  const getPeriodEntries = async (period) => {
    const { data } = await api.get(`transaction?period=${period}`);
    setPeriodEntries(data);
    console.log(data);
  }

  // useEffect(() => getPeriodEntries(currentPeriod), [currentPeriod]);

  // const count = useRef(0);
  // count.current++
  // console.log(count.current);

  return (
    <div className="container">
      <h2 className="center">Desafio Final do Bootcamp Full Stack</h2>

      <h1 className="center">Gerenciador Financeiro Pessoal</h1>


      <Selector
        currentItem={currentPeriod}
        allItens={allPeriods}
        onChange={handleChangeSelector}
      />

      <div id="informations" className="row">
        <InfoField description="Lançamentos" value={countCurrentEntries.current} />
        <InfoField description="Receitas" value={sumCurrentIncome.current} />
        <InfoField description="Despesas" value={sumCurrentExpenses.current} />
        <InfoField description="Saldos" value={sumCurrentBalance.current} />
      </div>

    </div>
  );
}
