import React, { useState, useEffect, useRef } from 'react';
import M from "materialize-css";
import api from './services/api';
import normalizeAccentuation from './helpers/normalizeAccentuation';
import Selector from './components/Selector';
import DisplayLine from './components/DisplayLine';
import EntriesList from './components/EntriesList';
import ModalReact from './components/ModalReact';
import ActionSearch from './components/ActionSearch';
import Footer from './components/Footer';


export default function App() {

  const today = new Date();
  const yyyy = String(today.getFullYear());
  const mm = String().concat('0', today.getMonth() + 1).slice(-2);
  const dd = String().concat('0', today.getDate()).slice(-2);
  const yearMonthDay = `${yyyy}-${mm}-${dd}`;

  const allPeriods = useRef([]);
  const periodEntries = useRef([]);
  const isEditing = useRef({
    status: false,
    entry: {
      type: '-',
      date: yearMonthDay,
    }
  });


  const [currentPeriod, setCurrentPeriod] = useState({
    value: yearMonthDay.substring(0, 7),
    index: 0
  });
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [searchInput, setSearchInput] = useState(null);
  const [calculations, setCalculations] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);


  const postEntry = async (entry) => {

    try {
      const { data } = await api.post('transaction', entry);

      if (data.yearMonth === currentPeriod.value) {
        const entries = [...periodEntries.current, data]
          .sort((item, next) => item.day - next.day);

        periodEntries.current = entries;

        setFilteredEntries([...entries]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const deleteEntry = async (id) => {
    try {
      await api.delete(`transaction/${id}`);

      const cleanedEntries = periodEntries.current.filter(({ _id }) => _id !== id);

      periodEntries.current = cleanedEntries;

      setFilteredEntries([...cleanedEntries]);
    } catch (error) {
      console.log(error.message);
    }
  }

  const putEntry = async (entry) => {
    try {
      const { data } = await api.put(`transaction/${entry._id}`, entry);

      if (data.yearMonth === currentPeriod.value) {
        const entries = [...periodEntries.current];
        const index = entries.findIndex(entry => entry._id === data._id);

        entries[index] = { ...data };

        entries.sort((item, next) => item.day - next.day);

        periodEntries.current = entries;

        setFilteredEntries([...entries]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  const editItem = (id) => {
    isEditing.current = {
      status: true,
      entry: periodEntries.current.find(entry => entry._id === id)
    };

    openModal();
  }

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);

    isEditing.current = {
      status: false,
      entry: {
        type: '-',
        date: yearMonthDay
      }
    };
  }


  const handleSelector = ({ tagName, value, selectedIndex }) => {
    const selected =
      tagName === 'SELECT'
        ? {
          value,
          index: selectedIndex
        }
        : value === '<'
          ? {
            value: allPeriods.current[currentPeriod.index - 1],
            index: currentPeriod.index - 1
          }
          : value === '>'
            ? {
              value: allPeriods.current[currentPeriod.index + 1],
              index: currentPeriod.index + 1
            }
            : {};

    setCurrentPeriod({ ...selected });
  }

  const handleItemClick = ({ id, value }) => {
    value === 'edit' && editItem(id);
    value === 'delete' && deleteEntry(id);
  }

  const handleSave = (entry) => {
    isEditing.current.status === false
      ? postEntry(entry)
      : putEntry(entry);

    closeModal();

    setSearchInput(null);
  }

  const handleSearch = ({ target: { value } }) => {
    setSearchInput(value);

    const valueToFind = normalizeAccentuation(value.toLowerCase());

    const filter = periodEntries.current.filter(entry =>
      normalizeAccentuation(entry.description.toLowerCase())
        .includes(valueToFind)
    );

    setFilteredEntries([...filter]);
  }


  useEffect(() => {
    const getPeriodEntries = async () => {
      const { data: { entries, periods } } =
        await api.get(`transaction/?period=${currentPeriod.value}`);

      entries.sort((item, next) => item.day - next.day);
      periods.sort((item, next) => item.localeCompare(next));

      currentPeriod.index = periods.findIndex(
        item => item === currentPeriod.value
      );

      allPeriods.current = periods;

      periodEntries.current = entries;

      setFilteredEntries([...entries]);

      setCurrentPeriod(currentPeriod);
    };

    getPeriodEntries();
  }, [currentPeriod]);


  useEffect(() => {
    const count = filteredEntries.length;
    const income = filteredEntries
      .filter(({ type }) => type === '+')
      .reduce((accumullator, { value }) => accumullator += value, 0);
    const expenses = filteredEntries
      .filter(({ type }) => type === '-')
      .reduce((accumullator, { value }) => accumullator += value, 0)

    setCalculations({
      count,
      income,
      expenses,
      balance: income - expenses
    })
  }, [filteredEntries]);



  return (
    <div className="container">

      <h1 className="header center">Gerenciador Financeiro</h1>

      <Selector
        items={{
          currentIndex: currentPeriod.index,
          currentValue: currentPeriod.value,
          list: [...allPeriods.current]
        }}
        onChange={handleSelector}
      />

      <DisplayLine
        className="_display-line"
        calculations={calculations}
      />

      <div className="row">

        <ModalReact
          buttonClasses="btn waves-effect waves-light col s12 m6 l4 _btn"
          isEditing={isEditing.current} onSave={handleSave}
          openModal={openModal} closeModal={closeModal}
          modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />

        <ActionSearch
          className="col s12 m6 l8 input-field"
          searchInput={searchInput} onChange={handleSearch} />

      </div>

      <EntriesList
        items={filteredEntries}
        onClick={handleItemClick} />

      <Footer />

    </div>
  );
}
