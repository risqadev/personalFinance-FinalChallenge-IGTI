import React, { useState, useEffect, useRef } from 'react';
import api from './services/api';
import Selector from './components/Selector';
import DisplayLine from './components/DisplayLine';
import EntriesList from './components/EntriesList';
import ModalReact from './components/ModalReact';
import ActionSearch from './components/ActionSearch';
import { formatBRL } from './helpers/formatter';
// import Modal from 'react-modal';
// import ActionsLine from './components/ActionsLine';
// import Button from './components/Button';
// import Form from './components/Form';


export default function App() {
  console.log('App() excope');

  const [currentPeriod, setCurrentPeriod] = useState('2020-09');
  const [periodEntries, setPeriodEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [allPeriods, setAllPeriods] = useState(['2020-09']);
  const [searchInput, setSearchInput] = useState(null);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  // const [isEditing, setIsEditing] = useState({
  //   status: false,
  //   entry: {
  //     type: '-',
  //     date: '2020-09-13'
  //   }
  // });

  const isEditing = useRef({
    status: false,
    entry: {
      type: '-',
      date: '2020-09-13'
    }
  });

  const countEntries = useRef(0);
  const incomeSum = useRef(0);
  const expensesSum = useRef(0);
  const balance = useRef(0);

  const handleChangeSelector = (selected) => {
    setCurrentPeriod(selected);
  }

  const handleItemAction = (action, id) => {
    action === 'edit' && editItem(id);
    action === 'delete' && deleteEntry(id);
  }

  const handleSave = (entry) => {
    console.log('App() handleSave');

    isEditing.current.status === false
      ? postEntry(entry)
      : putEntry(entry);

    closeModal();

    setSearchInput(null);
  }

  const handleSearch = ({ target: { value } }) => {
    console.log('handleSearch ' + value);

    setSearchInput(value);

    const filter = periodEntries.filter(entry =>
      entry.description.includes(value)
    );

    setFilteredEntries([...filter]);
  }

  const editItem = (id) => {
    // setIsEditing({
    //   status: true,
    //   entry: periodEntries.find(entry => entry._id === id)
    // });

    isEditing.current = {
      status: true,
      entry: periodEntries.find(entry => entry._id === id)
    };

    openModal();
  }

  // useEffect(() => {
  //   console.log('editItem', isEditing.entry);
  // }, [isEditing]);

  const postEntry = async (entry) => {
    try {
      const { data } = await api.post('transaction', entry);

      if (data.yearMonth === currentPeriod) {
        const entries = [...periodEntries, data]
          .sort((item, next) => item.day - next.day);

        setPeriodEntries([...entries]);
        setFilteredEntries([...entries]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const deleteEntry = async (id) => {
    try {
      await api.delete(`transaction/${id}`);

      const cleanedEntries = periodEntries.filter(({ _id }) => _id !== id);

      setPeriodEntries([...cleanedEntries]);
      setFilteredEntries([...cleanedEntries]);
    } catch (error) {
      console.log(error.message);
    }
  }

  const putEntry = async (entry) => {
    try {
      const { data } = await api.put(`transaction/${entry._id}`, entry);

      if (data.yearMonth === currentPeriod) {
        const entries = [...periodEntries];
        const index = entries.findIndex(entry => entry._id === data._id);

        entries[index] = { ...data };

        entries.sort((item, next) => item.day - next.day);

        setPeriodEntries([...entries]);
        setFilteredEntries([...entries]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const calculateInfos = () => {
    // console.log('calculeteInfos() excope');

    countEntries.current = filteredEntries.length;

    incomeSum.current = filteredEntries
      .filter(({ type }) => type === '+')
      .reduce((accumullator, { value }) => accumullator += value, 0);

    expensesSum.current = filteredEntries
      .filter(({ type }) => type === '-')
      .reduce((accumullator, { value }) => accumullator += value, 0);

    balance.current = incomeSum.current - expensesSum.current;
  };
  calculateInfos();
  // useEffect(calculateInfos, [periodEntries]);

  useEffect(() => {
    const getPeriodEntries = async () => {
      const { data: { entries, periods } } = await api.get(`transaction/?period=${currentPeriod}`);

      entries.sort((item, next) => item.day - next.day);

      setPeriodEntries([...entries]);
      setFilteredEntries([...entries]);
      setAllPeriods([...periods]);
    };

    getPeriodEntries();

    setFilteredEntries([]);
  }, [currentPeriod]);


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);

    // setIsEditing({
    //   status: false,
    //   entry: {
    //     type: '-',
    //     date: '2020-09-13'
    //   }
    // });

    isEditing.current = {
      status: false,
      entry: {
        type: '-',
        date: '2020-09-13'
      }
    };
  }




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
        income={formatBRL(incomeSum.current)}
        expenses={formatBRL(expensesSum.current)}
        balance={formatBRL(balance.current)}
      />

      {/* <ActionsLine onSaveNew={handleSaveNew} onSearch={handleSearch} isEditing={isEditing} /> */}

      <div className="row">

        <ModalReact onSave={handleSave} openModal={openModal} closeModal={closeModal} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} isEditing={isEditing.current} />

        <ActionSearch searchInput={searchInput} onChange={handleSearch} />
      </div>

      <EntriesList
        items={filteredEntries}
        returnAction={handleItemAction}
      />

    </div>
  );
}
